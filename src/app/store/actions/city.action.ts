import { Action } from '@ngrx/store';
import { 
    CitiesResponse
} from '../models';

export enum CityActionTypes {
  LOAD_CITIES = '[CITY] Load Cities',
  LOAD_CITIES_SUCCESS = '[CITY] Load Cities Success',
  LOAD_CITIES_FAILURE = '[CITY] Load Cities Failure',
  SET_CITIES = '[CITY] Set Cities'
}

export class LoadCitiesAction implements Action {
    readonly type = CityActionTypes.LOAD_CITIES;
}

export class LoadCitiesSuccessAction implements Action {
    readonly type = CityActionTypes.LOAD_CITIES_SUCCESS;

    constructor(public payload: CitiesResponse) {}
}

export class LoadCitiesFailureAction implements Action {
    readonly type = CityActionTypes.LOAD_CITIES_FAILURE;

    constructor(public payload: Error) {}
}

export class SetCitiesAction implements Action {
    readonly type = CityActionTypes.SET_CITIES;

    constructor(public payload: CitiesResponse) {}
}


export type CityAction =
    LoadCitiesAction |
    LoadCitiesSuccessAction |
    LoadCitiesFailureAction |
    SetCitiesAction
