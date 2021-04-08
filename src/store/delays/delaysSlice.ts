import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Delays } from 'main/types/Delays';

const initialState: Delays = {
  minCheckout: 3000,
  maxCheckout: 5000,
  restocksCheckout: 2250,
  refresh: 1000,
};

export const delaysSlice = createSlice({
  name: 'delays',
  initialState,
  reducers: {
    setDelays: (s, { payload }: PayloadAction<{ delays: Delays }>) => {
      return payload.delays;
    },
  },
});

export const { setDelays } = delaysSlice.actions;
