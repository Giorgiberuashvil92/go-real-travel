import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { UpdateItineraryTourOrTransportAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-change-activity',
  templateUrl: './change-activity.component.html',
  styleUrls: ['./change-activity.component.scss']
})
export class ChangeActivityComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  isSubmitted = false;
  isLoaded = false;
  tourTags: string[] = [];
  
  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    private itineraryService: ItineraryService
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
      if(this.itineraryState.tour && !this.isSubmitted && this.isLoaded) {
        this.generateTourTags();
      }
    });
  }

  onOK() {
    if(this.currentIndex === 0) {
      return;
    }
    if(this.itineraryState.alternateTours.data[this.currentIndex-1].attributes["transport-type"]) {
      this.dialogService.closeDialog();
      this.dialogService.openDialog('editTrip');
      return;
    }
    this.store.dispatch(new UpdateItineraryTourOrTransportAction({
      itineraryId: this.itineraryState.data.data.id,
      id: this.itineraryState.tour.id,
      body: {
        type: 'tours',
        attributes: {
          "solution-type": 'compadre',
          "solution-id": this.itineraryState.alternateTours.data[this.currentIndex-1].id
        }
      }
    }));
    this.isSubmitted = true;
    this.dialogService.updateSize('250px');
  }

  generateTourTags() {
    this.tourTags = this.itineraryState.tour.relationships.pois.data.map(r => this.itineraryService.generateWaypoint(this.itineraryState.data, r.id).attributes.name);
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}
