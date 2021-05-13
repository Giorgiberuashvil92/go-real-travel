import { PutProfileAction, PutProfileActionTypes } from '../actions/putProfile.action';

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

export function PutProfileReducer(state: ProfileState = initialState, action: PutProfileAction) {
switch (action.type) {
  case PutProfileActionTypes.LOAD_PROFILE:
    return {
        ...state,
        loading: true
    };
  case PutProfileActionTypes.LOAD_PROFILE_SUCCESS:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
  case PutProfileActionTypes.LOAD_PROFILE_FAILURE:
    return {
        ...state,
        data: action.payload,
        loading: false
    }
  default:
    return state;
}
}
