import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DeleteTourAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-remove-accept',
  templateUrl: './remove-accept.component.html',
  styleUrls: ['./remove-accept.component.scss']
})
export class RemoveAcceptComponent implements OnInit, OnDestroy {

  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;

  deleteTourLoading = false;

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
      if(this.deleteTourLoading && !this.itineraryState.deleteTourLoading) {
        this.dialogService.closeDialog();
      }
    });
  }

  onYes() {
    this.store.dispatch(new DeleteTourAction(this.itineraryState.data.data.id, this.data.id));
    this.deleteTourLoading = true;
    this.dialogService.updateSize('250px');
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}
