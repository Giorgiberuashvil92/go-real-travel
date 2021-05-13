import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'src/app/core/services/device-detector.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { LoadAffiliatePartnerActivitiesAction, LoadAffiliatePartnerTransportsAction } from 'src/app/store/actions';
import { AppState } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';
import { CityState } from 'src/app/store/reducers/city.reducer';

@Component({
  selector: 'app-booking-navigation',
  templateUrl: './bookings-navigation.component.html',
  styleUrls: ['./bookings-navigation.component.scss']
})
export class BookingsNavigationComponent implements OnInit, OnDestroy {

  itineraryState: ItineraryState;
  cityState: CityState;
  itineraryStateSub: Subscription
  cityStateSub: Subscription;
  bookingOptionIndexSub: Subscription;
  activeCityIndex = -1;
  option: number;

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>,
    public deviceDetectorService : DeviceDetectorService,
    public itineraryService: ItineraryService
  ) { }

  array = [
    {name:'All My bookings', imageURL: '/assets/book.svg'},
    {name:'City Cards & Local Transport', imageURL: '/assets/bus-icon.svg'},
    {name:'Tours & Activities', imageURL: '/assets/walking-man.svg'},
    {name:'Inter-City Transport', imageURL: '/assets/interpoller.svg'},
    {name:'Hotels & Apartments', imageURL: '/assets/bed.svg'},
  ]

  ngOnInit(): void {
    this.cityStateSub = this.store.select(store => store.city).subscribe(res => {
      this.cityState = res;
    });

    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe(res => {
      this.itineraryState = res;
    })

    this.bookingOptionIndexSub = this.itineraryService.bookingOptionIndex.subscribe(res => {
      this.option = res;
    })
  }

  onCityClick(index: number) {
    this.activeCityIndex = index;
    if(this.cityState && this.cityState.cities && this.cityState.cities.data && this.cityState.cities.data.length > this.activeCityIndex) {
      this.store.dispatch(new LoadAffiliatePartnerActivitiesAction(`subject-type=city&subject-id=${this.cityState.cities.data[index].id}`));
    }
    if(this.itineraryState && this.itineraryState.data && this.itineraryState.data.data && this.itineraryState.data.data.id
      && this.cityState && this.cityState.cities && this.cityState.cities.data && this.cityState.cities.data.length > this.activeCityIndex) {
        this.store.dispatch(new LoadAffiliatePartnerTransportsAction({ itineraryId: this.itineraryState.data.data.id, subjectId: this.cityState.cities.data[index].id, subjectType: 'city' }));
    }
  }

  openDialog(){
    this.dialogService.openDialog('navigationDialog');
  }

  ngOnDestroy() {
    if(this.cityStateSub) this.cityStateSub.unsubscribe();
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
    if(this.bookingOptionIndexSub) this.bookingOptionIndexSub.unsubscribe();
  }
}
