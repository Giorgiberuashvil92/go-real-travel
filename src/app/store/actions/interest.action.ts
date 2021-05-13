import { Action } from '@ngrx/store';
import { 
    InterestsResponse
} from '../models';

export enum InterestActionTypes {
  LOAD_INTERESTS = '[INTEREST] Load Interests',
  LOAD_INTERESTS_SUCCESS = '[INTEREST] Load Interests Success',
  LOAD_INTERESTS_FAILURE = '[INTEREST] Load Interests Failure',
}

export class LoadInterestsAction implements Action {
    readonly type = InterestActionTypes.LOAD_INTERESTS;
}

export class LoadInterestsSuccessAction implements Action {
    readonly type = InterestActionTypes.LOAD_INTERESTS_SUCCESS;

    constructor(public payload: InterestsResponse) {}
}

export class LoadInterestsFailureAction implements Action {
    readonly type = InterestActionTypes.LOAD_INTERESTS_FAILURE;

    constructor(public payload: Error) {}
}


export type InterestAction =
    LoadInterestsAction |
    LoadInterestsSuccessAction |
    LoadInterestsFailureAction
