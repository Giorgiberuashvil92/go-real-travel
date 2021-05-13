import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ProfileActionTypes } from '../actions';
import { LoadProfileAction, LoadProfileFailureAction, LoadProfileSuccessAction } from '../actions/profile.action';

@Injectable()
export class ProfileEffects {

    constructor(
      private actions$: Actions,
      private userService: UserService
    ) { }

    @Effect() loadProfile$ = this.actions$
    .pipe(
        ofType<LoadProfileAction>(ProfileActionTypes.LOAD_PROFILE),
        mergeMap(
        (d) => this.userService.getProfile()
            .pipe(
            map(data => {
                return new LoadProfileSuccessAction(data)
            }),
            catchError(error => of(new LoadProfileFailureAction(error)))
            )
        ),
    )

}
