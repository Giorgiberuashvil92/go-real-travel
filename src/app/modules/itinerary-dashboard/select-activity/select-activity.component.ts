import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoadCitiesAction, LoadInterestsAction, LoadItinerarySolutionsForTourAction, LoadItineraryToursSearchAction, SetItineraryToursSearchAction } from 'src/app/store/actions';
import { AppState, ItineraryToursSearchResponse } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';
import { CityState } from 'src/app/store/reducers/city.reducer';
import { InterestState } from 'src/app/store/reducers/interest.reducer';

@Component({
  selector: 'app-select-activity',
  templateUrl: './select-activity.component.html',
  styleUrls: ['./select-activity.component.scss']
})
export class SelectActivityComponent implements OnInit, OnDestroy {
  
  currentlyChosenIndex = -1;

  citySet = new Set<any>();
  interestSet = new Set<any>();
  activityInput: string = '';
  itinerary: ItineraryState;
  cityState$: Observable<CityState>;
  interestState$: Observable<InterestState>
  toursToShow: any[] = [];
  loadInterestIds = true;

  itineraryStateSub: Subscription;
  recommendedFor: string = '';

  constructor(
    public dialogService: DialogService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new SetItineraryToursSearchAction({ data: [] }));
    // this.store.dispatch(new LoadCitiesAction());
    this.store.dispatch(new LoadInterestsAction());
    this.cityState$ = this.store.select(store => store.city);
    this.interestState$ = this.store.select(store => store.interest);
    this.itineraryStateSub = this.store.select(store => store.itinerary).subscribe((itineraryState: ItineraryState) => {
      this.itinerary = itineraryState;
      if(this.itinerary.toursSearch) {
        this.toursToShow = this.filterByCities(this.itinerary.toursSearch);
      }
      if(this.loadInterestIds) {
        this.loadInterestIds = false;
        this.store.dispatch(
          new LoadItineraryToursSearchAction({ 
            itineraryId: this.itinerary.data.data.id, 
            interestIds: [...this.interestSet].map(i => i.id),
            text: this.activityInput
          })
        );
      }
    });
  }
  
  toggleCity(city: string) {
    if(this.citySet.has(city)) {
      this.citySet.delete(city);
    } else {
      this.citySet.add(city);
    }
    if(this.itinerary.toursSearch) {
      this.onCityChange();
    }
  }

  toggleInterest(interest: string) {
    if(this.interestSet.has(interest)) {
      this.interestSet.delete(interest);
    } else {
      this.interestSet.clear();
      this.interestSet.add(interest);
    }
    this.onInterestChange();
  }

  onCityChange() {
    this.toursToShow = this.filterByCities(this.itinerary.toursSearch);
  }

  onInterestChange() {
    // this.currentlyChosenIndex = 0;
    const interestArr = [...this.interestSet];
    this.store.dispatch(
      new LoadItineraryToursSearchAction({ 
        itineraryId: this.itinerary.data.data.id, 
        interestIds: interestArr.map(i => i.id),
        text: this.activityInput
      })
    );
    this.recommendedFor = [...this.interestSet].reduce((a, b) => `${a}, ${b.attributes.name}`, '').substr(1);
  }

  onInput(event) {
    if(this.activityInput.length >= 3) {
      this.store.dispatch(
        new LoadItineraryToursSearchAction({ 
          itineraryId: this.itinerary.data.data.id, 
          interestIds: [...this.interestSet].map(i => i.id),
          text: this.activityInput
        })
      );
    }
  }

  onNext() {
    if(this.toursToShow.length > this.currentlyChosenIndex) {
      this.store.dispatch(new LoadItinerarySolutionsForTourAction({ 
        itineraryId: this.itinerary.data.data.id, 
        tourOfferId: this.toursToShow[this.currentlyChosenIndex].id
      }))
      this.dialogService.closeDialog();
      this.dialogService.openDialog('chooseNewActivity', { tour: this.toursToShow[this.currentlyChosenIndex] });
    }
  }

  findCity(cities: any[], id: string): string {
    return cities.find(c => c.id === id).attributes.name;
  }

  filterCities(cities: any[]): any[] {
    return cities.filter(c => !!this.itinerary.data.data.relationships.cities.data.find(r => r.id === c.id));
  }

  filterInterests(interests: any[]): any[] {
    return interests.filter(i => i.attributes.continent === this.itinerary.data.data.attributes.continent);
  }

  filterByCities(toursSearch: ItineraryToursSearchResponse): any[] {
    if(this.citySet.size === 0) return toursSearch.data;
    const cityIdsSet = new Set<string>([...this.citySet].map(c => c.id));

    return toursSearch.data.filter(d => cityIdsSet.has(d.relationships.city.data.id));
  }

  ngOnDestroy() {
    if(this.itineraryStateSub) this.itineraryStateSub.unsubscribe();
  }
}
