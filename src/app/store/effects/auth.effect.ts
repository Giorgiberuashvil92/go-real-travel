import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActionTypes, SignInAuthAction, SignInAuthFailureAction, SignInAuthSuccessAction, SignUpAuthAction, SignUpAuthFailureAction, SignUpAuthSuccessAction } from '../actions/auth.action';
import { SignInAuthActionSuccessResponse, SignUpAuthActionSuccessResponse } from '../models';

@Injectable()
export class AuthEffects {

    constructor(
      private actions$: Actions,
      private authService: AuthService
    ) { }

    @Effect() signUpUser$ = this.actions$
    .pipe(
        ofType<SignUpAuthAction>(AuthActionTypes.SIGN_UP_AUTH),
        mergeMap(
        (d) => this.authService.signUpUser$(d.payload)
            .pipe(
            map(data => {
                return new SignUpAuthSuccessAction(data)
            }),
            catchError(error => of(new SignUpAuthFailureAction(error)))
            )
        ),
    )

    @Effect() signInUser$ = this.actions$
    .pipe(
        ofType<SignInAuthAction>(AuthActionTypes.SIGN_IN_AUTH),
        mergeMap(
        (d) => this.authService.signInUser$(d.payload)
            .pipe(
            map(data => {
                return new SignInAuthSuccessAction(data)
            }),
            catchError(error => of(new SignInAuthFailureAction(error)))
            )
        ),
    )
}
