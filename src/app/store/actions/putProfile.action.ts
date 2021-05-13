import { Action } from '@ngrx/store';

export enum PutProfileActionTypes {
  LOAD_PROFILE = '[PROFILE] Load PUT PROFILE',
  LOAD_PROFILE_SUCCESS = '[PROFILE] Load PUT PROFILE Success',
  LOAD_PROFILE_FAILURE = '[PROFILE] Load  PUT PROFILE Failure'
}
export class LoadPutProfileAction implements Action {
  readonly type = PutProfileActionTypes.LOAD_PROFILE
}

export class LoadPutProfileSuccessAction implements Action {
    readonly type = PutProfileActionTypes.LOAD_PROFILE_SUCCESS

    constructor(public payload: any) {}
}
export class LoadPutProfileFailureAction implements Action {
    readonly type = PutProfileActionTypes.LOAD_PROFILE_FAILURE

    constructor(public payload: Error) {}
}

export type PutProfileAction =
    LoadPutProfileAction |
    LoadPutProfileSuccessAction |
    LoadPutProfileFailureAction
