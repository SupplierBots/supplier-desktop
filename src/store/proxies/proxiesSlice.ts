import { SliceCaseReducers } from '@reduxjs/toolkit';
import { Proxy } from 'main/types/Proxy';
import { createUserDataSlice } from 'store/ createUserDataSlice';

export const proxiesSlice = createUserDataSlice<Proxy, SliceCaseReducers<Proxy[]>>({
  name: 'proxies',
});

export const {
  add: addProxy,
  update: updateProxy,
  remove: removeProxy,
  removeAll: removeAllProxies,
} = proxiesSlice.actions;
