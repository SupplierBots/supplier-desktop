import { Action } from 'redux';

export interface License {
  expirationDate: number;
  key: string;
}

export interface NewAccount {
  email: string;
  password: string;
  key: string;
}

export interface ExistingAccount {
  email: string;
  password: string;
}
export interface AuthState {
  readonly verifying: boolean;
  readonly authenticated: boolean;
  readonly uid: string;
  readonly error: string;
  readonly license: License | null;
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const CREATE_ACCOUNT_ATTEMPT = 'CREATE_ACCOUNT_ATTEMPT';
export const START_VERIFYING_CREDENTIALS = 'START_VERIFYING_CREDENTIALS';
export const START_WATCHING_LOGIN_TIME = 'START_WATCHING_LOGIN_TIME';
export const STOP_WATCHING_LOGIN_TIME = 'STOP_WATCHING_LOGIN_TIME';
export const INITIATE_USER_LOGOUT = 'INITIATE_USER_LOGOUT';

export interface UserLoggedInAction extends Action {
  type: typeof USER_LOGGED_IN;
  auth: AuthState;
}

export interface InitiateUserLogoutAction extends Action {
  type: typeof INITIATE_USER_LOGOUT;
  uid: string;
}
export interface UserLoggedOutAction extends Action {
  type: typeof USER_LOGGED_OUT;
}

export interface SetAuthErrorAction extends Action {
  type: typeof SET_AUTH_ERROR;
  error: string;
}

export interface LoginAttemptAction extends Action {
  type: typeof LOGIN_ATTEMPT;
  credentials: ExistingAccount;
}

export interface CreateAccountAttemptAction extends Action {
  type: typeof CREATE_ACCOUNT_ATTEMPT;
  credentials: NewAccount;
}

export interface StartVerifyingCredentialsAction extends Action {
  type: typeof START_VERIFYING_CREDENTIALS;
}

export interface StartWatchingLoginTimeAction extends Action {
  type: typeof START_WATCHING_LOGIN_TIME;
  uid: string;
  loginTime: number;
}

export interface StopWatchingLoginTimeAction extends Action {
  type: typeof STOP_WATCHING_LOGIN_TIME;
}

export type AuthActionTypes =
  | UserLoggedInAction
  | UserLoggedOutAction
  | SetAuthErrorAction
  | LoginAttemptAction
  | CreateAccountAttemptAction
  | StartVerifyingCredentialsAction
  | StartWatchingLoginTimeAction
  | InitiateUserLogoutAction
  | StopWatchingLoginTimeAction;
