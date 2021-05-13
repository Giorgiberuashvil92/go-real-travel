import { Action } from '@ngrx/store';
import { 
    SignUpAuthActionFailureResponse, 
    SignUpAuthActionRequest, 
    SignUpAuthActionSuccessResponse, 
    SignInAuthActionFailureResponse,
    SignInAuthActionRequest, 
    SignInAuthActionSuccessResponse 
} from '../models';

export enum AuthActionTypes {
  SIGN_UP_AUTH = '[AUTH] Sign Up Auth',
  SIGN_UP_AUTH_SUCCESS = '[AUTH] Sign Up Auth Success',
  SIGN_UP_AUTH_FAILURE = '[AUTH] Sign Up Auth Failure',
  SIGN_IN_AUTH = '[AUTH] Sign In Auth',
  SIGN_IN_AUTH_SUCCESS = '[AUTH] Sign In Auth Success',
  SIGN_IN_AUTH_FAILURE = '[AUTH] Sign In Auth Failure'
}

export class SignUpAuthAction implements Action {
    readonly type = AuthActionTypes.SIGN_UP_AUTH;

    constructor(public payload: SignUpAuthActionRequest) {}
}

export class SignUpAuthSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGN_UP_AUTH_SUCCESS;

    constructor(public payload: SignUpAuthActionSuccessResponse) {}
}

export class SignUpAuthFailureAction implements Action {
    readonly type = AuthActionTypes.SIGN_UP_AUTH_FAILURE;

    constructor(public payload: SignUpAuthActionFailureResponse) {}
}

export class SignInAuthAction implements Action {
    readonly type = AuthActionTypes.SIGN_IN_AUTH;

    constructor(public payload: SignInAuthActionRequest) {}
}

export class SignInAuthSuccessAction implements Action {
    readonly type = AuthActionTypes.SIGN_IN_AUTH_SUCCESS;

    constructor(public payload: SignInAuthActionSuccessResponse) {}
}

export class SignInAuthFailureAction implements Action {
    readonly type = AuthActionTypes.SIGN_IN_AUTH_FAILURE;

    constructor(public payload: SignInAuthActionFailureResponse) {}
}


export type AuthAction =
    SignUpAuthAction |
    SignUpAuthSuccessAction |
    SignUpAuthFailureAction |
    SignInAuthAction |
    SignInAuthSuccessAction |
    SignInAuthFailureAction
