import {
  SetChromiumPathAction,
  SET_CHROMIUM_PATH,
  SET_APP_DATA_PATH,
  SetAppDataPathAction,
} from './types';

export const setChromiumPath = (path: string): SetChromiumPathAction => ({
  type: SET_CHROMIUM_PATH,
  path,
});

export const setAppDataPath = (path: string): SetAppDataPathAction => ({
  type: SET_APP_DATA_PATH,
  path,
});
