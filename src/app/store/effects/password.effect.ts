import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { ItineraryActionTypes, LoadItineraryAction, LoadItineraryFailureAction, LoadItinerarySuccessAction} from '../actions/itinerary.action';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { PasswordsService } from 'src/app/core/services/passwords.service';
import { LoadPasswordFailureAction, LoadPasswordSuccessAction } from '../actions/passwords.action';

@Injectable()
export class PasswordEffects {

    constructor(
      private actions$: Actions,
      private passwordService: PasswordsService
    ) { }

    // @Effect() loadPassword$ = this.actions$
    // .pipe(
    //     ofType<LoadItineraryAction>(ItineraryActionTypes.LOAD_ITINERARY),
    //     mergeMap(
    //     (d) => this.passwordService.postPassword()
    //         .pipe(
    //         map(data => {
    //             return new LoadPasswordSuccessAction(data)
    //         }),
    //         catchError(error => of(new LoadPasswordFailureAction(error)))
    //         )
    //     ),
    // )

}
