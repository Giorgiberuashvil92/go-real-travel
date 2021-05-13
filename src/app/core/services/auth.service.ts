import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  SignUpAuthActionRequest, 
  SignUpAuthActionSuccessResponse,
  SignInAuthActionRequest, 
  SignInAuthActionSuccessResponse 
} from 'src/app/store/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  signUpUser$(payload: SignUpAuthActionRequest): Observable<SignUpAuthActionSuccessResponse> {
    return this.httpClient.post<SignUpAuthActionSuccessResponse>('/profile', payload);
  }

  signInUser$(payload: SignInAuthActionRequest): Observable<SignInAuthActionSuccessResponse> {
    return this.httpClient.post<SignInAuthActionSuccessResponse>('/session', payload);
  }
}
