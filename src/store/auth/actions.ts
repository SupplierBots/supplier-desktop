import {
  AuthActionTypes,
  USER_LOGGED_IN,
  SET_AUTH_ERROR,
  CREATE_ACCOUNT_ATTEMPT,
  LOGIN_ATTEMPT,
  AuthState,
  START_VERIFYING_CREDENTIALS,
  START_WATCHING_LOGIN_TIME,
  STOP_WATCHING_LOGIN_TIME,
  StartVerifyingCredentialsAction,
  StartWatchingLoginTimeAction,
  NewAccount,
  LoginAttemptAction,
  CreateAccountAttemptAction,
  ExistingAccount,
  INITIATE_USER_LOGOUT,
  USER_LOGGED_OUT,
  StopWatchingLoginTimeAction,
} from './types';

export const userLoggedIn = (auth: AuthState): AuthActionTypes => ({
  type: USER_LOGGED_IN,
  auth,
});

export const initiateUserLogout = (uid: string): AuthActionTypes => ({
  type: INITIATE_USER_LOGOUT,
  uid,
});

export const userLoggedOut = (): AuthActionTypes => ({
  type: USER_LOGGED_OUT,
});

export const setAuthError = (error: string): AuthActionTypes => ({
  type: SET_AUTH_ERROR,
  error,
});

export const startVerifyingCredentials = (): StartVerifyingCredentialsAction => ({
  type: START_VERIFYING_CREDENTIALS,
});

export const createAccountAttempt = (credentials: NewAccount): CreateAccountAttemptAction => ({
  type: CREATE_ACCOUNT_ATTEMPT,
  credentials,
});

export const loginAttempt = (credentials: ExistingAccount): LoginAttemptAction => ({
  type: LOGIN_ATTEMPT,
  credentials,
});

export const startWatchingLoginTime = (
  uid: string,
  loginTime: number,
): StartWatchingLoginTimeAction => ({
  type: START_WATCHING_LOGIN_TIME,
  uid,
  loginTime,
});

export const stopWatchingLoginTime = (): StopWatchingLoginTimeAction => ({
  type: STOP_WATCHING_LOGIN_TIME,
});
