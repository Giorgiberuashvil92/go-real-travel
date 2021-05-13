import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserOpen: boolean = false;
  isManageTripOpen: boolean = false;
  isCurrencyOpen: boolean = false;
  itineraryId: string;

  itineraryState: ItineraryState;
  itineraryStateSub: Subscription;

  manageTripItems = [
    {name:'All My bookings', imageURL: '/assets/book.svg'},
    {name:'City Cards & Local Transport', imageURL: '/assets/bus-icon.svg'},
    {name:'Tours & Activities', imageURL: '/assets/walking-man.svg'},
    {name:'Inter-City Transport', imageURL: '/assets/interpoller.svg'},
    {name:'Hotels & Apartments', imageURL: '/assets/bed.svg'},
  ]

  constructor(
    public router: Router,
    public store: Store<AppState>,
    public dialogService: DialogService,
    public itineraryService: ItineraryService
  ) { }

  ngOnInit(): void {
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
      if(this.itineraryState.data && this.itineraryState.data.data && this.itineraryState.data.data.id) {
        this.itineraryId = this.itineraryState.data.data.id;
      } 
    });
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}
