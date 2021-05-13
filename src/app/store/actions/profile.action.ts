import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  LOAD_PROFILE = '[PROFILE] Load PROFILE',
  LOAD_PROFILE_SUCCESS = '[PROFILE] Load PROFILE Success',
  LOAD_PROFILE_FAILURE = '[PROFILE] Load PROFILE Failure'
}
export class LoadProfileAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE
}

export class LoadProfileSuccessAction implements Action {
    readonly type = ProfileActionTypes.LOAD_PROFILE_SUCCESS

    constructor(public payload: any) {}
}
export class LoadProfileFailureAction implements Action {
    readonly type = ProfileActionTypes.LOAD_PROFILE_FAILURE

    constructor(public payload: Error) {}
}

export type ProfileAction =
    LoadProfileAction |
    LoadProfileSuccessAction |
    LoadProfileFailureAction
