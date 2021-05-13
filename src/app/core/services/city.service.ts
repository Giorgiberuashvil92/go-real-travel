import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitiesResponse } from 'src/app/store/models';
import { ItineraryState } from 'src/app/store/reducers';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCities$(): Observable<CitiesResponse> {
    return this.httpClient.get<CitiesResponse>('/cities');
  }

  generateCities(itineraryState: ItineraryState): CitiesResponse {
    return {
      data: itineraryState.data.included.filter(r => r.type === 'cities')
    } as CitiesResponse;
  }
}
