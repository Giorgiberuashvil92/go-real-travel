import { Action } from '@ngrx/store';

export enum PasswordActionTypes {
  LOAD_PASSWORD = '[PROFILE] Load PROFILE',
  LOAD_PASSWORD_SUCCESS = '[PROFILE] Load PROFILE Success',
  LOAD_PASSWORD_FAILURE = '[PROFILE] Load PROFILE Failure'
}
export class LoadPasswordAction implements Action {
  readonly type = PasswordActionTypes.LOAD_PASSWORD
}

export class LoadPasswordSuccessAction implements Action {
    readonly type = PasswordActionTypes.LOAD_PASSWORD_SUCCESS

    constructor(public payload: any) {}
}
export class LoadPasswordFailureAction implements Action {
    readonly type = PasswordActionTypes.LOAD_PASSWORD_FAILURE

    constructor(public payload: Error) {}
}

export type PasswordAction =
    LoadPasswordAction |
    LoadPasswordSuccessAction |
    LoadPasswordFailureAction
