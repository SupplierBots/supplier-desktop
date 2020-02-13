import { Action } from 'redux';
export interface ControllerState {
  lockTasks: boolean;
  chromiumPath: string;
  appData: string;
}

export const SET_CHROMIUM_PATH = 'SET_CHROMIUM_PATH';
export const SET_APP_DATA_PATH = 'SET_APP_DATA_PATH';

export interface SetChromiumPathAction extends Action {
  type: typeof SET_CHROMIUM_PATH;
  path: string;
}

export interface SetAppDataPathAction extends Action {
  type: typeof SET_APP_DATA_PATH;
  path: string;
}
export type ControllerActionTypes = SetChromiumPathAction | SetAppDataPathAction;
