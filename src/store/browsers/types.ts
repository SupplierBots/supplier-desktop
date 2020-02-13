import { BrowserData } from 'types/BrowserData';
import { Action } from 'redux';

export type BrowsersState = BrowserData[];

export const SET_ACCOUNT_EMAIL = 'SET_ACCOUNT_EMAIL';
export const SET_ACTIVE = 'SET_ACTIVE';
export const CREATE_BROWSER = 'CREATE_BROWSER';
export const REMOVE_BROWSER = 'REMOVE_BROWSER';

export interface SetAccountEmailAction extends Action {
  type: typeof SET_ACCOUNT_EMAIL;
  id: string;
  accountEmail: string;
}

export interface SetActiveAction extends Action {
  type: typeof SET_ACTIVE;
  id: string;
  isActive: boolean;
}

export interface CreateBrowserAction extends Action {
  type: typeof CREATE_BROWSER;
}

export interface RemoveBrowserAction extends Action {
  type: typeof REMOVE_BROWSER;
  id: string;
}

export type BrowserDataActionTypes =
  | SetAccountEmailAction
  | SetActiveAction
  | CreateBrowserAction
  | RemoveBrowserAction;
