import { AffiliateAction, AffiliateActionTypes } from '../actions';
import { AffiliateActivityTypesResponse, AffiliatePartnerActivitiesLiveSearchResponse, AffiliatePartnerActivitiesResponse, AffiliatePartnerTransportsResponse, FailureResponse } from '../models';

export interface AffiliateState {
    partnerActivities: AffiliatePartnerActivitiesResponse,
    partnerActivitiesLoading: boolean,
    partnerActivitiesError: FailureResponse,
    partnerActivitiesLiveSearch: AffiliatePartnerActivitiesLiveSearchResponse,
    partnerActivitiesLiveSearchLoading: boolean,
    partnerActivitiesLiveSearchError: FailureResponse,
    activityTypes: AffiliateActivityTypesResponse,
    activityTypesLoading: boolean,
    activityTypesError: FailureResponse,
    partnerTransports: AffiliatePartnerTransportsResponse,
    partnerTransportsLoading: boolean,
    partnerTransportsError: FailureResponse
}

const initialState: AffiliateState = {
    partnerActivities: undefined,
    partnerActivitiesLoading: false,
    partnerActivitiesError: undefined,
    partnerActivitiesLiveSearch: undefined,
    partnerActivitiesLiveSearchLoading: false,
    partnerActivitiesLiveSearchError: undefined,
    activityTypes: undefined,
    activityTypesLoading: false,
    activityTypesError: undefined,
    partnerTransports: undefined,
    partnerTransportsLoading: false,
    partnerTransportsError: undefined
};



export function AffiliateReducer(state: AffiliateState = initialState, action: AffiliateAction) {
    switch (action.type) {
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES:
            return {
                ...state,
                partnerActivitiesLoading: true
            };
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES_SUCCESS:
            return {
                ...state,
                partnerActivities: action.payload,
                partnerActivitiesError: null,
                partnerActivitiesLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES_FAILURE:
            return {
                ...state,
                partnerActivitiesError: action.payload,
                partnerActivitiesLoading: false
            }
        case AffiliateActionTypes.SET_AFFILIATE_PARTNER_ACTIVITES:
            return {
                ...state,
                partnerActivitiesLoading: false,
                partnerActivitiesError: null,
                partnerActivities: action.payload
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES:
            return {
                ...state,
                partnerActivitiesLiveSearchLoading: true
            };
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES_SUCCESS:
            return {
                ...state,
                partnerActivitiesLiveSearch: action.payload,
                partnerActivitiesLiveSearchError: null,
                partnerActivitiesLiveSearchLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_ACTIVITIES_FAILURE:
            return {
                ...state,
                partnerActivitiesLiveSearchError: action.payload,
                partnerActivitiesLiveSearchLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_ACTIVITY_TYPES:
            return {
                ...state,
                activityTypesLoading: true
            };
        case AffiliateActionTypes.LOAD_AFFILIATE_ACTIVITY_TYPES_SUCCESS:
            return {
                ...state,
                activityTypes: action.payload,
                activityTypesError: null,
                activityTypesLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_ACTIVITY_TYPES_FAILURE:
            return {
                ...state,
                activityTypesError: action.payload,
                activityTypesLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_TRANSPORTS:
            return {
                ...state,
                partnerTransportsLoading: true
            };
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_TRANSPORTS_SUCCESS:
            return {
                ...state,
                partnerTransports: action.payload,
                partnerTransportsError: null,
                partnerTransportsLoading: false
            }
        case AffiliateActionTypes.LOAD_AFFILIATE_PARTNER_TRANSPORTS_FAILURE:
            return {
                ...state,
                partnerTransportsError: action.payload,
                partnerTransportsLoading: false
            }
        case AffiliateActionTypes.SET_AFFILIATE_PARTNER_TRANSPORTS:
            return {
                ...state,
                partnerTransportsLoading: false,
                partnerTransportsError: null,
                partnerTransports: action.payload
            }
        default:
            return state;
    }
}
