import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';
import { InterestService } from 'src/app/core/services/interest.service';
import { InterestActionTypes, LoadInterestsAction, LoadInterestsFailureAction, LoadInterestsSuccessAction } from '../actions';
import { AppState } from '../models';
import { Store } from '@ngrx/store';

@Injectable()
export class InterestEffects {

    constructor(
      private actions$: Actions,
      private interestService: InterestService,
      private store: Store<AppState>
    ) { }

    @Effect() loadInterests$ = this.actions$
    .pipe(
        ofType<LoadInterestsAction>(InterestActionTypes.LOAD_INTERESTS),
        withLatestFrom(this.store.select(store => store.interest)),
        mergeMap(
        (state) =>
            (state[1].interests ? of(state[1].interests) : this.interestService.getInterests$())
            .pipe(
            map(data => {
                return new LoadInterestsSuccessAction(data)
            }),
            catchError(error => of(new LoadInterestsFailureAction(error)))
            )
        ),
    )
}
