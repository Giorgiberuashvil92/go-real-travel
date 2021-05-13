import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UpdateItineraryTourOrTransportAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-change-transport',
  templateUrl: './change-transport.component.html',
  styleUrls: ['./change-transport.component.scss']
})
export class ChangeTransportComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  isLoaded: boolean = false;
  isSubmitted: boolean = false;

  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;
  
  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dialogService.updateSize('250px');
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
      this.isLoaded = this.itineraryState.alternateTours && this.itineraryState.alternateTours.data && this.itineraryState.alternateTours.data.length > 0;
      if(this.isLoaded && !this.isSubmitted) {
        this.dialogService.updateSize(this.dialogService.dialogMap[this.dialogService.currentDialogName].maxWidth);
      }
      if(this.isSubmitted && !this.itineraryState.updateTourOrTransportLoading) {
        this.dialogService.closeDialog();
        return;
      }
    });
  }

  onOK(itineraryState: ItineraryState) {
    if(this.currentIndex === 0) {
      this.dialogService.closeDialog();
      return;
    }

    if(itineraryState.alternateTours.data[this.currentIndex - 1].attributes.type === 'compadre') {
      this.store.dispatch(new UpdateItineraryTourOrTransportAction({
        itineraryId: itineraryState.data.data.id,
        id: itineraryState.tour.id,
        body: {
          type: 'tours',
          attributes: {
            "solution-type": 'compadre',
            "solution-id": itineraryState.alternateTours.data[this.currentIndex - 1].id
          }
        }
      }));
      this.isSubmitted = true;
      this.dialogService.updateSize('250px');
    } else {
      this.dialogService.closeDialog();
      this.dialogService.openDialog('editTrip', itineraryState.alternateTours.data[this.currentIndex - 1]);
    }
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}
