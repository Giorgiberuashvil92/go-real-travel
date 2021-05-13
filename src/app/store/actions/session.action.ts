import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  LOAD_SESSION = '[SESSION] Load PUT SESSION',
  LOAD_SESSION_SUCCESS = '[SESSION] Load PUT SESSION Success',
  LOAD_SESSION_FAILURE = '[SESSION] Load  PUT SESSION Failure',
  DELETE_SESSION = '[SESSION] Load PUT SESSION',
  DELETE_SESSION_SUCCESS = '[SESSION] Load PUT SESSION Success',
  DELETE_SESSION_FAILURE = '[SESSION] Load  PUT SESSION Failure'
}
export class LoadSessionAction implements Action {
  readonly type = SessionActionTypes.LOAD_SESSION
}

export class LoadSessionSuccessAction implements Action {
    readonly type = SessionActionTypes.LOAD_SESSION_SUCCESS

    constructor(public payload: any) {}
}
export class LoadSessionFailureAction implements Action {
    readonly type = SessionActionTypes.LOAD_SESSION_FAILURE

    constructor(public payload: Error) {}
}

export class DeleteSessionAction implements Action {
  readonly type = SessionActionTypes.DELETE_SESSION
}

export class DeleteSessionSuccessAction implements Action {
    readonly type = SessionActionTypes.DELETE_SESSION_SUCCESS
    constructor(public payload: any) {}
}
export class DeleteSessionFailureAction implements Action {
    readonly type = SessionActionTypes.DELETE_SESSION_FAILURE
    constructor(public payload: Error) {}
}


export type SessionAction =
    LoadSessionAction |
    LoadSessionSuccessAction |
    LoadSessionFailureAction |
    DeleteSessionAction |
    DeleteSessionSuccessAction |
    DeleteSessionFailureAction


