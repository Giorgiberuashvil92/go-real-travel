import {
    AuthAction,
    AuthActionTypes
} from '../actions';

export interface AuthState {
    data: any,
    loading: boolean,
    error: Error
}

const initialState: AuthState = {
    data: undefined,
    loading: false,
    error: undefined
};

export function AuthReducer(state: AuthState = initialState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.SIGN_UP_AUTH:
        return {
            ...state,
            loading: true
        }
    case AuthActionTypes.SIGN_UP_AUTH_SUCCESS:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
    case AuthActionTypes.SIGN_UP_AUTH_FAILURE:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
    case AuthActionTypes.SIGN_IN_AUTH:
        return {
            ...state,
            loading: true
        }
    case AuthActionTypes.SIGN_IN_AUTH_SUCCESS:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
    case AuthActionTypes.SIGN_IN_AUTH_FAILURE:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
    default:
      return state;
  }
}
