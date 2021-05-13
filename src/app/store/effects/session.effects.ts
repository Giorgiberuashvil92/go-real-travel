import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { SessionAction } from '../actions';
import { DeleteSessionFailureAction, DeleteSessionSuccessAction, LoadSessionFailureAction, LoadSessionSuccessAction, SessionActionTypes } from '../actions/session.action';

@Injectable()
export class SessionEffects {

    constructor(
      private actions$: Actions,
      private userService: UserService
    ) { }

    @Effect() loadSession$ = this.actions$
    .pipe(
        ofType<SessionAction>(SessionActionTypes.LOAD_SESSION),
        mergeMap(
        (d) => this.userService.getSession()
            .pipe(
            map(data => {
                return new LoadSessionSuccessAction(data)
            }),
            catchError(error => of(new LoadSessionFailureAction(error)))
            )
        ),
    )

    @Effect() deleteSession = this.actions$
    .pipe(
        ofType<SessionAction>(SessionActionTypes.DELETE_SESSION),
           mergeMap(
                (d) => this.userService.getSession()
            .pipe(
            map(data => {
                return new DeleteSessionSuccessAction(data)
            }),
            catchError(error => of(new DeleteSessionFailureAction(error)))
            )
        ),
    )
}
