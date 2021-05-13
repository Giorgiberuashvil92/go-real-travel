import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { UpdateItineraryAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-arrive-day',
  templateUrl: './arrive-day.component.html',
  styleUrls: ['./arrive-day.component.scss']
})
export class ArriveDayComponent implements OnInit, OnDestroy {

  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;
  dayChangeSub: Subscription;

  updateItineraryLoading: boolean;
  startDateString: string;
  endDateString: string;
  daysDiff: number = 0;
  addedDays: number = 0;
  

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    private itineraryService: ItineraryService
  ) { }

  ngOnInit(): void {
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
      if(this.itineraryState.data && this.itineraryState.data.data) {
        this.startDateString = this.itineraryState.data.data.attributes['start-date'];
        this.endDateString = this.itineraryState.data.data.attributes['end-date'];
      }
      if(this.updateItineraryLoading && !this.itineraryState.updateItineraryLoading) {
        this.updateItineraryLoading = false;
        if(!this.itineraryState.updateItineraryError) {
          this.dialogService.closeDialog();
        } else {
          this.dialogService.updateSize(this.dialogService.dialogMap[this.dialogService.currentDialogName].maxWidth);
        }
      }
    });
    this.dayChangeSub = this.itineraryService.dayChange.subscribe(res => {
      switch (res.action) {
        case 'add':
          this.addedDays++;
          break;
        case 'delete':
          this.addedDays--;
          break;
        default:
          break;
      }
      this.changeDates();
    });

    this.itineraryService.daysObj = {
      old: [],
      new: []
    }
  }

  onOK() {
    this.itineraryService.editTripOKClicked.next(true);
    
    setTimeout(() => {
      let daysArr = [];
      this.itineraryService.daysObj.old = [...new Set(this.itineraryService.daysObj.old)];
      this.itineraryService.daysObj.new = [...new Set(this.itineraryService.daysObj.new)];
      for(let i=0; i<this.itineraryService.daysObj.old.length; i++) {
        if(!this.itineraryService.daysObj.new.find(r => r.id === this.itineraryService.daysObj.old[i].id)) {
          daysArr.push({
            id: this.itineraryService.daysObj.old[i].id,
            '_destroy': 1
          });
        }
      }
      for(let i=0; i<this.itineraryService.daysObj.new.length; i++) {
        if(this.itineraryService.daysObj.new[i].id === 'newDay') {
          daysArr.push({
            index: this.itineraryService.daysObj.new[i].attributes.index
          })
        } else {
          if(!daysArr.find(r => r.id === this.itineraryService.daysObj.new[i].id && !r['_destroy'])) {
            daysArr.push({
              id: this.itineraryService.daysObj.new[i].id,
              index: this.itineraryService.daysObj.new[i].attributes.index
            })
          }
        }
      }
      this.itineraryService.daysObj.new = [];
      this.store.dispatch(new UpdateItineraryAction({ 
        itineraryId: this.itineraryState.data.data.id,
        body: {
          type: 'itineraries',
          attributes: {
            "start-date": this.startDateString,
            "end-date": this.endDateString,
            days: daysArr
          }
        }
      }));
      this.updateItineraryLoading = true;
      this.dialogService.updateSize('250px');
    }, 0);
  }

  onFromDateChange(date: Date) {
    this.daysDiff = Math.abs(Math.ceil((date.getTime() - new Date(this.itineraryState.data.data.attributes["start-date"]).getTime()) / (1000 * 60 * 60 * 24)));
    this.changeDates();
  }

  changeDates() {
    const startDate = new Date(this.itineraryState.data.data.attributes["start-date"]);
    startDate.setDate(startDate.getDate() + this.daysDiff);
    const endDate = new Date(this.itineraryState.data.data.attributes["end-date"]);
    endDate.setDate(endDate.getDate() + this.daysDiff + this.addedDays);
    this.startDateString = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
    this.endDateString = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
    if(this.dayChangeSub) this.dayChangeSub.unsubscribe();
  }
}
