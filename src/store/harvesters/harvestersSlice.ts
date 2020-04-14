import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'uuid/v4';
import * as R from 'ramda';
import { HarvesterData } from 'main/types/HarvesterData';
import { Option } from 'main/types/Option';

const initialProxyValue = { value: 'none', label: 'Proxy - None' };

const createNewHarvester = () => {
  const id = uuid().replace(/-/g, '');
  return {
    id,
    accountEmail: `Not-Logged-${R.takeLast(5, id)}`,
    isActive: false,
    isLogged: false,
    loadedTask: null,
    proxy: initialProxyValue,
  };
};

export const harvestersSlice = createSlice({
  name: 'harvesters',
  initialState: [createNewHarvester(), createNewHarvester()] as HarvesterData[],
  reducers: {
    createHarvester: {
      reducer: (state, { payload }: PayloadAction<{ browser: HarvesterData }>) => {
        state.push(payload.browser);
      },
      prepare: () => ({
        payload: {
          browser: createNewHarvester(),
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
    setProxy: (state, { payload }: PayloadAction<{ id: string; proxy: Option }>) => {
      const browser = state.find(b => b.id === payload.id);
      if (browser) browser.proxy = payload.proxy;
    },
    resetProxy: (state, { payload }: PayloadAction<{ id: string }>) => {
      const browser = state.find(b => b.id === payload.id);
      if (browser) browser.proxy = initialProxyValue;
    },
    removeBrowser: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(b => b.id !== payload.id);
    },
  },
});

export const {
  createHarvester,
  setActive,
  setAccountEmail,
  removeBrowser,
  setProxy,
  resetProxy,
} = harvestersSlice.actions;
