import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AffiliateService } from 'src/app/core/services/affiliate.service';
import { AffiliateActionTypes, LoadAffiliateActivityTypesAction, LoadAffiliateActivityTypesFailureAction, LoadAffiliateActivityTypesSuccessAction, LoadAffiliatePartnerActivitiesAction, LoadAffiliatePartnerActivitiesFailureAction, LoadAffiliatePartnerActivitiesLiveSearchAction, LoadAffiliatePartnerActivitiesLiveSearchFailureAction, LoadAffiliatePartnerActivitiesLiveSearchSuccessAction, LoadAffiliatePartnerActivitiesSuccessAction, LoadAffiliatePartnerTransportsAction, LoadAffiliatePartnerTransportsFailureAction, LoadAffiliatePartnerTransportsSuccessAction } from '../actions';
import { AppState } from '../models';
import { Store } from '@ngrx/store';

@Injectable()
export class AffiliateEffects {

    constructor(
      private actions$: Actions,
      private affiliateService: AffiliateService,
      private store: Store<AppState>
    ) { }

    @Effect() loadAffiliatePartnerActivities$ = this.actions$
    .pipe(
        ofType<LoadAffiliatePartnerActivitiesAction>(AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES),
        switchMap(
        (d) => this.affiliateService.getAffiliatePartnerActivities$(d.payload)
            .pipe(
            map(data => {
                return new LoadAffiliatePartnerActivitiesSuccessAction(data)
            }),
            catchError(error => of(new LoadAffiliatePartnerActivitiesFailureAction(error)))
            )
        ),
    )

    @Effect() loadAffiliatePartnerActivitiesLiveSearch$ = this.actions$
    .pipe(
        ofType<LoadAffiliatePartnerActivitiesLiveSearchAction>(AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES_LIVE_SEARCH),
        switchMap(
        (d) => this.affiliateService.getAffiliatePartnerActivitiesLiveSearch$(d.payload.cityId, d.payload.activityTypeId, d.payload.text)
            .pipe(
            map(data => {
                return new LoadAffiliatePartnerActivitiesLiveSearchSuccessAction(data)
            }),
            catchError(error => of(new LoadAffiliatePartnerActivitiesLiveSearchFailureAction(error)))
            )
        ),
    )

    @Effect() loadAffiliateActivityTypes$ = this.actions$
    .pipe(
        ofType<LoadAffiliateActivityTypesAction>(AffiliateActionTypes.LOAD_AFFILIATE_ACTIVITY_TYPES),
        withLatestFrom(this.store.select(store => store.affiliate)),
        switchMap(
        (state) => 
            (state[1].activityTypes ? of(state[1].activityTypes) : this.affiliateService.getAffiliateActivityTypes$())
            .pipe(
            map(data => {
                return new LoadAffiliateActivityTypesSuccessAction(data)
            }),
            catchError(error => of(new LoadAffiliateActivityTypesFailureAction(error)))
            )
        ),
    )

    @Effect() loadAffiliatePartnerTransports$ = this.actions$
    .pipe(
        ofType<LoadAffiliatePartnerTransportsAction>(AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_TRANSPORTS),
        mergeMap(
        (d) => this.affiliateService.getAffiliatePartnerTransports$(d.payload.itineraryId, d.payload.subjectId, d.payload.subjectType)
            .pipe(
            map(data => {
                return new LoadAffiliatePartnerTransportsSuccessAction(data)
            }),
            catchError(error => of(new LoadAffiliatePartnerTransportsFailureAction(error)))
            )
        ),
    )
}
