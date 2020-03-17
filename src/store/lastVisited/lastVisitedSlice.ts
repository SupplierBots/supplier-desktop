import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LastVisitedState {
  product: string;
  profile: string;
  proxy: string;
}

const initialState: LastVisitedState = {
  product: '',
  profile: '',
  proxy: '',
};

export type LastVisitedType = 'products' | 'profiles' | 'proxies';

export const lastVisitedSlice = createSlice({
  name: 'lastVisited',
  initialState,
  reducers: {
    setLastVisitedProduct: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.product = payload.id;
    },
    setLastVisitedProfile: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.profile = payload.id;
    },
    setLastVisitedProxy: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.proxy = payload.id;
    },
  },
});

export const {
  setLastVisitedProduct,
  setLastVisitedProfile,
  setLastVisitedProxy,
} = lastVisitedSlice.actions;
