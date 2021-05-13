import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<any> {
    return this.httpClient.get<any>(`/profile`);
  }
  putProfile(): Observable<any> {
    return this.httpClient.put<any>(`/profile`,{"first-name": "string","last-name": "string"});
  }
  getSession(): Observable<any> {
    return this.httpClient.get<any>(`/session`);
  }
  deleteSession(): Observable<any> {
    return this.httpClient.delete<any>(`/session`);
  }

}
