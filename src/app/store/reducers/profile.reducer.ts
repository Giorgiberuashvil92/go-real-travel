import {
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

export function ProfileReducer(state: ProfileState = initialState, action: ProfileAction) {
  switch (action.type) {
    case ProfileActionTypes.LOAD_PROFILE:
      return {
          ...state,
          loading: true
      };
    case ProfileActionTypes.LOAD_PROFILE_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false
      }
    case ProfileActionTypes.LOAD_PROFILE_FAILURE:
      return {
          ...state,
          data: action.payload,
          loading: false
      }
    default:
      return state;
  }
}
