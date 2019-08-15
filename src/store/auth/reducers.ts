import {
  AuthState,
  AuthActionTypes,
  USER_LOGGED_IN,
  SET_AUTH_ERROR,
  START_VERIFYING_CREDENTIALS,
  USER_LOGGED_OUT,
} from './types';

const initialState: AuthState = {
  verifying: false,
  authenticated: false,
  uid: '',
  error: '',
  license: null,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.auth;
    case USER_LOGGED_OUT:
      return initialState;
    case SET_AUTH_ERROR:
      return {
        ...state,
        verifying: false,
        error: action.error,
      };
    case START_VERIFYING_CREDENTIALS:
      return {
        ...state,
        verifying: true,
      };
    default:
      return state;
  }
};
