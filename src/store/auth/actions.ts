import { AuthActionTypes, CHANGE_AUTH_STATE } from './types';

export const changeAuthState = (authenticated: boolean): AuthActionTypes => ({
  type: CHANGE_AUTH_STATE,
  authenticated,
});
