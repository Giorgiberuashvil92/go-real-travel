import { Action } from '@ngrx/store';
import { FailureResponse, ItineraryAlternateToursResponse, ItinerarySolutionsForTourResponse, ItineraryToursSearchResponse, ItineraryResponse, UpdateItineraryTourOrTransportResponse } from '../models';

export enum ItineraryActionTypes {
  LOAD_ITINERARY = '[ITINERARY] Load Itinerary',
  LOAD_ITINERARY_SUCCESS = '[ITINERARY] Load Itinerary Success',
  LOAD_ITINERARY_FAILURE = '[ITINERARY] Load Itinerary Failure',
  SET_DAY_INDEX = '[ITINERARY] Set Day Index',
  SET_TOUR_INDEX = '[ITINERARY] Set Tour Index',
  SET_TOUR = '[ITINERARY] Set Tour',
  DELETE_TOUR = '[ITINERARY] Delete Tour',
  DELETE_TOUR_SUCCESS = '[ITINERARY] Delete Tour Failure',
  DELETE_TOUR_FAILURE = '[ITINERARY] Delete Tour Success',
  LOAD_ITINERARY_ALTERNATE_TOURS = '[ITINERARY] Load Itinerary Alternate Tours',
  LOAD_ITINERARY_ALTERNATE_TOURS_SUCCESS = '[ITINERARY] Load Itinerary Alternate Tours Success',
  LOAD_ITINERARY_ALTERNATE_TOURS_FAILURE = '[ITINERARY] Load Itinerary Alternate Tours Failure',
  UPDATE_ITINERARY_TOUR_OR_TRANSPORT = '[ITINERARY] Update Itinerary Tour Or Transport',
  UPDATE_ITINERARY_TOUR_OR_TRANSPORT_SUCCESS = '[ITINERARY] Update Itinerary Tour Or Transport Success',
  UPDATE_ITINERARY_TOUR_OR_TRANSPORT_FAILURE = '[ITINERARY] Update Itinerary Tour Or Transport Failure',
  LOAD_TOURS_SEARCH = '[ITINERARY] Load Tours Search',
  LOAD_TOURS_SEARCH_SUCCESS = '[ITINERARY] Load Tours Search Success',
  LOAD_TOURS_SEARCH_FAILURE = '[ITINERARY] Load Tours Search Failure',
  SET_TOURS_SEARCH = '[ITINERARY] Set Tours Search',
  LOAD_TOURS_SOLUTIONS_FOR_TOUR = '[ITINERARY] Load Tours Solutions For Tour',
  LOAD_TOURS_SOLUTIONS_FOR_TOUR_SUCCESS = '[ITINERARY] Load Tours Solutions For Tour Success',
  LOAD_TOURS_SOLUTIONS_FOR_TOUR_FAILURE = '[ITINERARY] Load Tours Solutions For Tour Failure',
  POST_TOURS_SOLUTION_FOR_TOUR = '[ITINERARY] Post Tours Solution For Tour',
  POST_TOURS_SOLUTION_FOR_TOUR_SUCCESS = '[ITINERARY] Post Tours Solution For Tour Success',
  POST_TOURS_SOLUTION_FOR_TOUR_FAILURE = '[ITINERARY] Post Tours Solution For Tour Failure',
  UPDATE_ITINERARY = '[ITINERARY] Update Itinerary',
  UPDATE_ITINERARY_SUCCESS = '[ITINERARY] Update Itinerary Success',
  UPDATE_ITINERARY_FAILURE = '[ITINERARY] Update Itinerary Failure'
}
export class LoadItineraryAction implements Action {
  readonly type = ItineraryActionTypes.LOAD_ITINERARY;

  constructor(public payload: string) {}
}

export class LoadItinerarySuccessAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_ITINERARY_SUCCESS;

    constructor(public payload: ItineraryResponse) {}
}

export class LoadItineraryFailureAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_ITINERARY_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class SetDayIndexAction implements Action {
  readonly type = ItineraryActionTypes.SET_DAY_INDEX;

  constructor(public payload: number) {}
}

export class SetTourIndexAction implements Action {
  readonly type = ItineraryActionTypes.SET_TOUR_INDEX;

  constructor(public payload: number) {}
}

export class SetTourAction implements Action {
  readonly type = ItineraryActionTypes.SET_TOUR;

  constructor(public payload: any) {}
}

export class DeleteTourAction implements Action {
  readonly type = ItineraryActionTypes.DELETE_TOUR;

  constructor(public itineraryId: string, public id: string) {}
}

export class DeleteTourSuccessAction implements Action {
    readonly type = ItineraryActionTypes.DELETE_TOUR_SUCCESS;

    constructor(public payload: ItineraryResponse) {}
}

export class DeleteTourFailureAction implements Action {
    readonly type = ItineraryActionTypes.DELETE_TOUR_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class LoadItineraryAlternateToursAction implements Action {
  readonly type = ItineraryActionTypes.LOAD_ITINERARY_ALTERNATE_TOURS;

  constructor(public payload: { itineraryId: string; id: string }) {}
}

export class LoadItineraryAlternateToursySuccessAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_ITINERARY_ALTERNATE_TOURS_SUCCESS;

    constructor(public payload: ItineraryAlternateToursResponse) {}
}

export class LoadItineraryAlternateToursFailureAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_ITINERARY_ALTERNATE_TOURS_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class LoadItinerarySolutionsForTourAction implements Action {
  readonly type = ItineraryActionTypes.LOAD_TOURS_SOLUTIONS_FOR_TOUR;

  constructor(public payload: { itineraryId: string; tourOfferId: string }) {}
}

export class LoadItinerarySolutionsForTourSuccessAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_TOURS_SOLUTIONS_FOR_TOUR_SUCCESS;

    constructor(public payload: ItinerarySolutionsForTourResponse) {}
}

export class LoadItinerarySolutionsForTourFailureAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_TOURS_SOLUTIONS_FOR_TOUR_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class LoadItineraryToursSearchAction implements Action {
  readonly type = ItineraryActionTypes.LOAD_TOURS_SEARCH;

  constructor(public payload: { itineraryId: string; interestIds: string[], text: string }) {}
}

export class LoadItineraryToursSearchSuccessAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_TOURS_SEARCH_SUCCESS;

    constructor(public payload: ItineraryToursSearchResponse) {}
}

export class LoadItineraryToursSearchFailureAction implements Action {
    readonly type = ItineraryActionTypes.LOAD_TOURS_SEARCH_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class SetItineraryToursSearchAction implements Action {
  readonly type = ItineraryActionTypes.SET_TOURS_SEARCH;

  constructor(public payload: ItineraryToursSearchResponse) {}
}

export class UpdateItineraryTourOrTransportAction implements Action {
  readonly type = ItineraryActionTypes.UPDATE_ITINERARY_TOUR_OR_TRANSPORT;

  constructor(public payload: { 
    itineraryId: string;
    id: string;
    body: {
      type: string; 
      attributes: { 
        'solution-type': string; 
        'solution-id': string; 
      }
    }
  }) {}
}

export class UpdateItineraryTourOrTransportSuccessAction implements Action {
    readonly type = ItineraryActionTypes.UPDATE_ITINERARY_TOUR_OR_TRANSPORT_SUCCESS;

    constructor(public payload: UpdateItineraryTourOrTransportResponse) {}
}

export class UpdateItineraryTourOrTransportFailureAction implements Action {
    readonly type = ItineraryActionTypes.UPDATE_ITINERARY_TOUR_OR_TRANSPORT_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class PostItinerarySolutionForTourAction implements Action {
  readonly type = ItineraryActionTypes.POST_TOURS_SOLUTION_FOR_TOUR;

  constructor(public payload: { 
    itineraryId: string;
    body: {
      type: string; 
      attributes: { 
        'solution-type': string; 
        'solution-id': string; 
        "day-id": string;
      }
    }
  }) {}
}

export class  PostItinerarySolutionForTourSuccessAction implements Action {
    readonly type = ItineraryActionTypes.POST_TOURS_SOLUTION_FOR_TOUR_SUCCESS;

    constructor(public payload: ItineraryResponse) {}
}

export class  PostItinerarySolutionForTourFailureAction implements Action {
    readonly type = ItineraryActionTypes.POST_TOURS_SOLUTION_FOR_TOUR_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export class UpdateItineraryAction implements Action {
  readonly type = ItineraryActionTypes.UPDATE_ITINERARY;

  constructor(public payload: { 
    itineraryId: string;
    body: {
      type: string; 
      attributes: { 
        'start-date': string; 
        'end-date': string;
        'days': Array<{
          'id'?: string;
          'index'?: number;
          '_destroy'?: boolean;
        }> 
      }
    }
  }) {}
}

export class UpdateItinerarySuccessAction implements Action {
    readonly type = ItineraryActionTypes.UPDATE_ITINERARY_SUCCESS;

    constructor(public payload: ItineraryResponse) {}
}

export class UpdateItineraryFailureAction implements Action {
    readonly type = ItineraryActionTypes.UPDATE_ITINERARY_FAILURE;

    constructor(public payload: FailureResponse) {}
}

export type ItineraryAction =
    LoadItineraryAction |
    LoadItinerarySuccessAction |
    LoadItineraryFailureAction |
    SetDayIndexAction |
    SetTourIndexAction |
    DeleteTourAction |
    DeleteTourSuccessAction |
    DeleteTourFailureAction |
    LoadItineraryAlternateToursAction |
    LoadItineraryAlternateToursySuccessAction |
    LoadItineraryAlternateToursFailureAction |
    UpdateItineraryTourOrTransportAction |
    UpdateItineraryTourOrTransportSuccessAction |
    UpdateItineraryTourOrTransportFailureAction |
    SetTourAction |
    LoadItineraryToursSearchAction |
    LoadItineraryToursSearchSuccessAction |
    LoadItineraryToursSearchFailureAction |
    LoadItinerarySolutionsForTourAction |
    LoadItinerarySolutionsForTourSuccessAction |
    LoadItinerarySolutionsForTourFailureAction |
    SetItineraryToursSearchAction |
    PostItinerarySolutionForTourAction |
    PostItinerarySolutionForTourSuccessAction |
    PostItinerarySolutionForTourFailureAction |
    UpdateItineraryAction |
    UpdateItinerarySuccessAction |
    UpdateItineraryFailureAction
