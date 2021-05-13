import { SessionAction, SessionActionTypes } from '../actions/session.action';

export interface ProfileState {
  data: any,
  loading: boolean,
  error: Error
}

const initialState: ProfileState = {
  data: undefined,
  loading: false,
  error: undefined
};

export function SessionReducer(state: ProfileState = initialState, action: SessionAction) {
switch (action.type) {
  case SessionActionTypes.LOAD_SESSION:
    return {
        ...state,
        loading: true
    };
  case SessionActionTypes.LOAD_SESSION_SUCCESS:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
  case SessionActionTypes.LOAD_SESSION_FAILURE:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
      case SessionActionTypes.DELETE_SESSION:
        return {
            ...state,
            loading: true
        };
      case SessionActionTypes.DELETE_SESSION_SUCCESS:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
      case SessionActionTypes.DELETE_SESSION_FAILURE:
        return {
            ...state,
            data: action.payload,
            loading: false
        }
  default:
    return state;
}
}
