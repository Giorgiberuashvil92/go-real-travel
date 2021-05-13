import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap, debounceTime, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';
import { ItineraryService } from 'src/app/core/services/itinerary.service';
import { LoadAffiliatePartnerActivitiesFailureAction, DeleteTourAction, DeleteTourFailureAction, DeleteTourSuccessAction, ItineraryActionTypes, LoadItineraryAction, LoadItineraryAlternateToursAction, LoadItineraryAlternateToursySuccessAction, LoadItineraryFailureAction, LoadItinerarySuccessAction, UpdateItineraryTourOrTransportAction, UpdateItineraryTourOrTransportFailureAction, UpdateItineraryTourOrTransportSuccessAction, LoadItineraryToursSearchAction, LoadItineraryToursSearchSuccessAction, LoadItineraryToursSearchFailureAction, LoadItinerarySolutionsForTourAction, LoadItinerarySolutionsForTourSuccessAction, LoadItinerarySolutionsForTourFailureAction, PostItinerarySolutionForTourAction, PostItinerarySolutionForTourSuccessAction, PostItinerarySolutionForTourFailureAction, UpdateItineraryAction, UpdateItinerarySuccessAction, UpdateItineraryFailureAction } from '../actions';
import { AppState } from '../models';
import { Store } from '@ngrx/store';

@Injectable()
export class ItineraryEffects {

    constructor(
      private actions$: Actions,
      private itineraryService: ItineraryService,
      private store: Store<AppState>
    ) { }


    @Effect() loadItinerary$ = this.actions$
    .pipe(
        ofType<LoadItineraryAction>(ItineraryActionTypes.LOAD_ITINERARY),
        withLatestFrom(this.store.select(store => store.itinerary)),
        switchMap(
        (state) => 
            (state[1].data && state[1].data.data && state[1].data.data.id === state[0].payload ? of(state[1].data) : this.itineraryService.getItinerary$(state[0].payload))
            .pipe(
            map(data => {
                return new LoadItinerarySuccessAction(data)
            }),
            catchError(error => of(new LoadItineraryFailureAction(error)))
            )
        ),
    )

    @Effect() deleteTour$ = this.actions$
    .pipe(
        ofType<DeleteTourAction>(ItineraryActionTypes.DELETE_TOUR),
        mergeMap(
        (d) => this.itineraryService.deleteTour$(d.itineraryId, d.id)
            .pipe(
            map(data => {
                return new DeleteTourSuccessAction(data)
            }),
            catchError(error => of(new DeleteTourFailureAction(error)))
            )
        ),
    )

    @Effect() loadItineraryAlternateTours$ = this.actions$
    .pipe(
        ofType<LoadItineraryAlternateToursAction>(ItineraryActionTypes.LOAD_ITINERARY_ALTERNATE_TOURS),
        switchMap(
        (d) => this.itineraryService.getItineraryAlternateTours$(d.payload.itineraryId, d.payload.id)
            .pipe(
            map(data => {
                return new LoadItineraryAlternateToursySuccessAction(data)
            }),
            catchError(error => of(new LoadAffiliatePartnerActivitiesFailureAction(error)))
            )
        ),
    )

    @Effect() updateItineraryTourOrTransport$ = this.actions$
    .pipe(
        ofType<UpdateItineraryTourOrTransportAction>(ItineraryActionTypes.UPDATE_ITINERARY_TOUR_OR_TRANSPORT),
        mergeMap(
        (d) => this.itineraryService.updateItineraryTourOrTransport$(d.payload.itineraryId, d.payload.id, d.payload.body)
            .pipe(
            map(data => {
                return new UpdateItineraryTourOrTransportSuccessAction(data)
            }),
            catchError(error => of(new UpdateItineraryTourOrTransportFailureAction(error)))
            )
        ),
    )

    @Effect() loadItineraryToursSearch$ = this.actions$
    .pipe(
        ofType<LoadItineraryToursSearchAction>(ItineraryActionTypes.LOAD_TOURS_SEARCH),
        debounceTime(300),
        switchMap(
        (d) => this.itineraryService.getItineraryToursSearch$(d.payload.itineraryId, d.payload.interestIds, d.payload.text)
            .pipe(
            map(data => {
                return new LoadItineraryToursSearchSuccessAction(data)
            }),
            catchError(error => of(new LoadItineraryToursSearchFailureAction(error)))
            )
        ),
    )

    @Effect() loadItinerarySolutionsForTour$ = this.actions$
    .pipe(
        ofType<LoadItinerarySolutionsForTourAction>(ItineraryActionTypes.LOAD_TOURS_SOLUTIONS_FOR_TOUR),
        switchMap(
        (d) => this.itineraryService.getItinerarySolutionsForTour$(d.payload.itineraryId, d.payload.tourOfferId)
            .pipe(
            map(data => {
                return new LoadItinerarySolutionsForTourSuccessAction(data)
            }),
            catchError(error => of(new LoadItinerarySolutionsForTourFailureAction(error)))
            )
        ),
    )

    @Effect() postItinerarySolutionForTour$ = this.actions$
    .pipe(
        ofType<PostItinerarySolutionForTourAction>(ItineraryActionTypes.POST_TOURS_SOLUTION_FOR_TOUR),
        switchMap(
        (d) => this.itineraryService.postItinerarySolutionForTour$(d.payload.itineraryId, d.payload.body)
            .pipe(
            map(data => {
                return new PostItinerarySolutionForTourSuccessAction(data)
            }),
            catchError(error => of(new PostItinerarySolutionForTourFailureAction(error)))
            )
        ),
    )

    @Effect() updateItinerary$ = this.actions$
    .pipe(
        ofType<UpdateItineraryAction>(ItineraryActionTypes.UPDATE_ITINERARY),
        switchMap(
        (d) => this.itineraryService.updateItinerary$(d.payload.itineraryId, d.payload.body)
            .pipe(
            map(data => {
                return new UpdateItinerarySuccessAction(data)
            }),
            catchError(error => of(new UpdateItineraryFailureAction(error)))
            )
        ),
    )
}
