import { AuthState, AuthActionTypes, CHANGE_AUTH_STATE } from './types';

const initialState: AuthState = {
  authenticated: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case CHANGE_AUTH_STATE:
      return {
        ...state,
        authenticated: action.authenticated,
      };
    default:
      return state;
  }
};
