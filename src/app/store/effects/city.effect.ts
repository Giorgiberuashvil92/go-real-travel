import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { CityService } from 'src/app/core/services/city.service';
import { CityActionTypes, LoadCitiesAction, LoadCitiesFailureAction, LoadCitiesSuccessAction } from '../actions';
import { AppState } from '../models';
import { Store } from '@ngrx/store';

@Injectable()
export class CityEffects {

    constructor(
      private actions$: Actions,
      private cityService: CityService,
      private store: Store<AppState>
    ) { }

    @Effect() loadCities$ = this.actions$
    .pipe(
        ofType<LoadCitiesAction>(CityActionTypes.LOAD_CITIES),
        withLatestFrom(this.store.select(store => store.city)),
        switchMap(
        (state) =>
            (state[1].cities ? of(state[1].cities) : this.cityService.getCities$())
            .pipe(
            map(data => {
                return new LoadCitiesSuccessAction(data)
            }),
            catchError(error => of(new LoadCitiesFailureAction(error)))
            )
        ),
    )
}
