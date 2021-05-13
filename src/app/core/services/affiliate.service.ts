import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AffiliateActivityTypesResponse, AffiliatePartnerActivitiesLiveSearchResponse, AffiliatePartnerActivitiesResponse, AffiliatePartnerTransportsResponse } from 'src/app/store/models';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  constructor(
    private httpClient: HttpClient,
    private dialogService: DialogService
  ) { }

  getAffiliatePartnerActivities$(query: string): Observable<AffiliatePartnerActivitiesResponse> {
    return this.httpClient.get<AffiliatePartnerActivitiesResponse>(`/affiliate/partner-activities?${query}`);
  }

  getAffiliatePartnerActivitiesLiveSearch$(cityId: string, activityTypeId?: string, text?: string): Observable<AffiliatePartnerActivitiesLiveSearchResponse> {
    let query = `city-id=${cityId}`;
    if(activityTypeId) query += `&activity-type-ids=${activityTypeId}`;
    if(text) query += `&text=${text}`;
    return this.httpClient.get<AffiliatePartnerActivitiesLiveSearchResponse>(`/affiliate/partner-activities/live-search?${query}`);
  }

  getAffiliateActivityTypes$(): Observable<AffiliateActivityTypesResponse> {
    return this.httpClient.get<AffiliateActivityTypesResponse>('/affiliate/activity-types');
  }

  getAffiliatePartnerTransports$(itineraryId: string, subjectId: string, subjectType: string): Observable<AffiliatePartnerTransportsResponse> {
    return this.httpClient.get<AffiliatePartnerTransportsResponse>(`/affiliate/partner-transports?itinerary-id=${itineraryId}&subject-id=${subjectId}&subject-type=${subjectType}`);
  }

  test() {
    console.log('test');
  }

  onRedirect(activity: any, isTransport: boolean = false) {
    this.dialogService.openDialog('acceptDialog', {
      question: `Did you book ${isTransport ? activity.title : activity.attributes.title}?`,
      yesFn: this.test
    });
    const rawUrl: string = isTransport ? activity.url : activity.attributes.url;
    localStorage.setItem('urlToRedirect', rawUrl);
    window.open(`${window.location.origin}/redirect?url=${encodeURIComponent(rawUrl)}&isTransport=${isTransport}` , '_blank');
  }
}
