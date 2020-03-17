import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'uuid/v4';
import * as R from 'ramda';
import { BrowserData } from 'main/types/BrowserData';

const createNewBrowser = () => {
  const id = uuid().replace(/-/g, '');
  return {
    id,
    accountEmail: `Not-Logged-${R.takeLast(5, id)}`,
    isActive: false,
    isLogged: false,
    loadedTask: null,
  };
};

export const browsersSlice = createSlice({
  name: 'browsers',
  initialState: [createNewBrowser(), createNewBrowser()] as BrowserData[],
  reducers: {
    createBrowser: {
      reducer: (state, { payload }: PayloadAction<{ browser: BrowserData }>) => {
        state.push(payload.browser);
      },
      prepare: () => ({
        payload: {
          browser: createNewBrowser(),
        },
      }),
    },
    setActive: (state, { payload }: PayloadAction<{ id: string; isActive: boolean }>) => {
      const browser = state.find(b => b.id === payload.id);
      if (browser) browser.isActive = payload.isActive;
    },
    setAccountEmail: (state, { payload }: PayloadAction<{ id: string; email: string }>) => {
      const browser = state.find(b => b.id === payload.id);
      if (browser) {
        browser.accountEmail = payload.email;
        browser.isLogged = true;
      }
    },
    removeBrowser: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(b => b.id !== payload.id);
    },
  },
});

export const { createBrowser, setActive, setAccountEmail, removeBrowser } = browsersSlice.actions;
