import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterestsResponse } from 'src/app/store/models';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getInterests$(): Observable<InterestsResponse> {
    return this.httpClient.get<InterestsResponse>('/interests');
  }
}
