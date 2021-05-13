import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ItineraryAlternateToursResponse, ItinerarySolutionsForTourResponse, ItineraryToursSearchResponse, ItineraryResponse, UpdateItineraryTourOrTransportResponse } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';
import { DialogService } from './dialog.service';


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  dayChange = new Subject<{action: string; index: number; cityName: string; deletedDay?: any}>();
  editTripOKClicked = new Subject<boolean>();
  setLocationPaginatorIndex = new Subject<number>();
  bookingOptionIndex = new BehaviorSubject<number>(0);
  daysObj = {
    old: [],
    new: []
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getItinerary$(id: string): Observable<ItineraryResponse> {
    return this.httpClient.get<ItineraryResponse>(`/itineraries/${id}`);
  }

  deleteTour$(itineraryId: string, id: string): Observable<ItineraryResponse> {
    return this.httpClient.delete<ItineraryResponse>(`/itineraries/${itineraryId}/tours/${id}`);
  }

  getItineraryAlternateTours$(itineraryId: string, id: string): Observable<ItineraryAlternateToursResponse>{
    return this.httpClient.get<ItineraryAlternateToursResponse>(`/itineraries/${itineraryId}/tours/${id}/alternative`);
  }

  updateItineraryTourOrTransport$(itineraryId: string, id: string, body: any): Observable<UpdateItineraryTourOrTransportResponse> {
    return this.httpClient.put<UpdateItineraryTourOrTransportResponse>(`/itineraries/${itineraryId}/tours/${id}`, { data: body }, { headers: new HttpHeaders({'Content-Type': 'application/vnd.api+json'})});
  }

  getItineraryToursSearch$(itineraryId: string, interestIds: string[], text: string): Observable<ItineraryToursSearchResponse>{
    let query = interestIds.reduce((a, b) => `${a}interest-ids[]=${b}&`, '');
    if(text) {
      query += `&text=${text}`
    }
    return this.httpClient.get<ItineraryToursSearchResponse>(`/itineraries/${itineraryId}/tours/search?${query.includes('text') ? query : query.substr(0, query.length - 1)}`)
  }

  getItinerarySolutionsForTour$(itineraryId: string, tourOfferId: string): Observable<ItinerarySolutionsForTourResponse>{
    return this.httpClient.get<ItinerarySolutionsForTourResponse>(`/itineraries/${itineraryId}/tours/solutions?tour-offer-id=${tourOfferId}`);
  }

  postItinerarySolutionForTour$(itineraryId: string, body: any): Observable<ItineraryResponse>{
    return this.httpClient.post<ItineraryResponse>(`/itineraries/${itineraryId}/tours`, { data: body }, { headers: new HttpHeaders({'Content-Type': 'application/vnd.api+json'})});
  }

  updateItinerary$(id: string, body: any): Observable<ItineraryResponse> {
    return this.httpClient.put<ItineraryResponse>(`/itineraries/${id}`, { data: body }, { headers: new HttpHeaders({'Content-Type': 'application/vnd.api+json'})});
  }

  findCityById(itinerary: ItineraryState, id: string) {
    return itinerary.data['included'].find(i => i.type === 'cities' && i.id === id);
  }

  findDayById(itinerary: ItineraryState, id: string) {
    return itinerary.data['included'].find(i => i.type === 'days' && i.id === id);
  }

  findCity(itinerary: ItineraryState, day: any): string {
    if(day['relationships']['starting-city'].data && day['relationships']['starting-city'].data.id 
        && day['relationships']['ending-city'].data && day['relationships']['ending-city'].data.id 
        && day['relationships']['starting-city'].data.id !== day['relationships']['ending-city'].data.id) {
      return itinerary.data['included'].find(i => i.type === 'cities' && i.id === day['relationships']['starting-city'].data.id).attributes.name
         + ' - ' 
         + itinerary.data['included'].find(i => i.type === 'cities' && i.id === day['relationships']['ending-city'].data.id).attributes.name;
    }
    if(day['relationships']['starting-city'].data && day['relationships']['starting-city'].data.id) {
      return itinerary.data['included'].find(i => i.type === 'cities' && i.id === day['relationships']['starting-city'].data.id).attributes.name;
    } else if(day['relationships']['ending-city'].data && day['relationships']['ending-city'].data.id) {
      return itinerary.data['included'].find(i => i.type === 'cities' && i.id === day['relationships']['ending-city'].data.id).attributes.name;
    }
    return 'Location Not Found';
  }

  generateDay(itinerary: ItineraryState) {
    return itinerary.data['included'].find(i => i.type === 'days' && i.id === itinerary.data.data['relationships'].days.data[itinerary.dayIndex-1].id);
  }

  generateAllDays(itinerary: ItineraryResponse): any[] {
    return itinerary.included.filter(i => i.type === 'days');
  }

  generateTours(itinerary: ItineraryResponse, day: any) {
    return day['relationships']['tours'].data.map(t => itinerary['included'].find(i => i.type === 'tours' && i.id === t.id));
  }

  generateWaypoints(itinerary: ItineraryState, tours: any) {
    if(tours && tours.length > itinerary.tourIndex) {
      return tours[itinerary.tourIndex]['relationships'].pois.data.map(d => itinerary.data['included'].find(i => i.type === 'waypoints' && i.id === d.id));
    }
    return [];
  }

  generateWaypoint(itineraryResponse: ItineraryResponse, id: string) {
    return itineraryResponse.included.find(i => i.type === 'waypoints' && i.id === id);
  }

  generateCitiesArray(itineraryResponse: ItineraryResponse) {
    const res: string[] = itineraryResponse.data.relationships.cities.data.map(c => itineraryResponse.included.find(i => i.type === 'cities' && i.id === c.id).attributes.name);
    return res;
  }
}
