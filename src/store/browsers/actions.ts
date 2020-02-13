import {
  SetAccountEmailAction,
  SET_ACCOUNT_EMAIL,
  SetActiveAction,
  SET_ACTIVE,
  CREATE_BROWSER,
  CreateBrowserAction,
  RemoveBrowserAction,
  REMOVE_BROWSER,
} from './types';

export const setAccountEmail = (id: string, accountEmail: string): SetAccountEmailAction => ({
  type: SET_ACCOUNT_EMAIL,
  id,
  accountEmail,
});

export const setActive = (id: string, isActive: boolean): SetActiveAction => ({
  type: SET_ACTIVE,
  id,
  isActive,
});

export const createBrowser = (): CreateBrowserAction => ({
  type: CREATE_BROWSER,
});

export const removeBrowser = (id: string): RemoveBrowserAction => ({
  type: REMOVE_BROWSER,
  id,
});
