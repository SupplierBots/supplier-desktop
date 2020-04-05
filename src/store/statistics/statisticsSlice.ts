import { createSlice } from '@reduxjs/toolkit';

export interface StatisticsState {
  createdProducts: number;
  checkouts: number;
}

const initialState: StatisticsState = {
  createdProducts: 0,
  checkouts: 0,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    incrementCheckouts: state => {
      state.checkouts++;
    },
    incrementCreatedProducts: state => {
      state.createdProducts++;
    },
    resetStatistics: () => {
      return initialState;
    },
  },
});

export const {
  incrementCheckouts,
  incrementCreatedProducts,
  resetStatistics,
} = statisticsSlice.actions;
