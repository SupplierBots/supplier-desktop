import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Proxy } from 'main/types/Proxy';

export const proxiesSlice = createSlice({
  name: 'proxies',
  initialState: [] as Proxy[],
  reducers: {
    addProxy: (state, { payload }: PayloadAction<{ proxy: Proxy }>) => {
      state.push(payload.proxy);
    },
    updateProxy: (state, { payload }: PayloadAction<{ proxy: Proxy }>) => {
      return state.map(p => {
        return p.id === payload.proxy.id ? payload.proxy : p;
      });
    },
    deleteProxy: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(p => p.id !== payload.id);
    },
    deleteAllProxies: () => {
      return [];
    },
  },
});

export const { addProxy, updateProxy, deleteProxy, deleteAllProxies } = proxiesSlice.actions;
