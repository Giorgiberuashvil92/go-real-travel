import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { PutProfileAction } from '../actions';
import { LoadPutProfileFailureAction, LoadPutProfileSuccessAction, PutProfileActionTypes } from '../actions/putProfile.action';

@Injectable()
export class PutProfileEffects {

    constructor(
      private actions$: Actions,
      private userService: UserService
    ) { }

    @Effect() putProfile$ = this.actions$
    .pipe(
        ofType<PutProfileAction>(PutProfileActionTypes.LOAD_PROFILE),
        mergeMap(
        (d) => this.userService.getProfile()
            .pipe(
            map(data => {
                return new LoadPutProfileSuccessAction(data)
            }),
            catchError(error => of(new LoadPutProfileFailureAction(error)))
            )
        ),
    )

}
