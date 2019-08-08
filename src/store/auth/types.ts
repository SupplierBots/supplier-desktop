import { Action } from 'redux';

export interface AuthState {
  readonly authenticated: boolean;
}

export const CHANGE_AUTH_STATE = 'CHANGE_AUTH_STATE';

export interface ChangeAuthAction extends Action {
  type: typeof CHANGE_AUTH_STATE;
  authenticated: boolean;
}

export type AuthActionTypes = ChangeAuthAction;
