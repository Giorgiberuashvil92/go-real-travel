import {
  PasswordAction,
  PasswordActionTypes,
  ProfileAction,
  ProfileActionTypes
} from '../actions';

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

export function PasswordReducer(state: ProfileState = initialState, action: PasswordAction) {
switch (action.type) {
  case PasswordActionTypes.LOAD_PASSWORD:
    return {
        ...state,
        loading: true
    };
  case PasswordActionTypes.LOAD_PASSWORD_SUCCESS:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
  case PasswordActionTypes.LOAD_PASSWORD_FAILURE:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
  default:
    return state;
}
}
