import uuid from 'uuid/v4';
import {
  BrowsersState,
  BrowserDataActionTypes,
  CREATE_BROWSER,
  SET_ACTIVE,
  SET_ACCOUNT_EMAIL,
  REMOVE_BROWSER,
} from './types';
import * as R from 'ramda';

const createNewBrowser = () => {
  const id = uuid().replace(/-/g, '');
  return { id, accountEmail: `Not-Logged-${R.takeLast(5, id)}`, isActive: false, isLogged: false };
};
const initialState: BrowsersState = [createNewBrowser(), createNewBrowser()];

export const browsersReducer = (
  state = initialState,
  action: BrowserDataActionTypes,
): BrowsersState => {
  switch (action.type) {
    case CREATE_BROWSER: {
      return [...state, createNewBrowser()];
    }
    case SET_ACTIVE: {
      return state.map(browser => {
        if (browser.id !== action.id) return browser;
        return {
          ...browser,
          isActive: action.isActive,
        };
      });
    }
    case SET_ACCOUNT_EMAIL: {
      return state.map(browser => {
        if (browser.id !== action.id) return browser;
        return {
          ...browser,
          accountEmail: action.accountEmail,
          isLogged: true,
        };
      });
    }
    case REMOVE_BROWSER: {
      return state.filter(browser => browser.id !== action.id);
    }
    default:
      return state;
  }
};
