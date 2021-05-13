import { InterestAction, InterestActionTypes } from '../actions';
import { InterestsResponse } from '../models';

export interface InterestState {
  interests: InterestsResponse,
  loading: boolean,
  error: Error
}

const initialState: InterestState = {
  interests: undefined,
  loading: false,
  error: undefined
};



export function InterestReducer(state: InterestState = initialState, action: InterestAction) {
  switch (action.type) {
    case InterestActionTypes.LOAD_INTERESTS:
      return {
          ...state,
          loading: true
      };
    case InterestActionTypes.LOAD_INTERESTS_SUCCESS:
      return {
          ...state,
          interests: action.payload,
          error: null,
          loading: false
      }
    case InterestActionTypes.LOAD_INTERESTS_FAILURE:
      return {
          ...state,
          error: action.payload,
          loading: false
      }
    default:
      return state;
  }
}
