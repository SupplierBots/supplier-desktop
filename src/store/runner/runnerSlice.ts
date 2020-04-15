import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RunnerState } from 'main/types/RunnerState';

const initialState: RunnerState = {
  scheduled: false,
  time: '',
  proxies: false,
  proxiesRegion: 'eu',
  localIPTasks: 0,
  restocks: false,
  monitorDelay: 1000,
};

export const runnerSlice = createSlice({
  name: 'runner',
  initialState,
  reducers: {
    setScheduler: (s, { payload }: PayloadAction<{ data: RunnerState }>) => {
      return payload.data;
    },
  },
});

export const { setScheduler } = runnerSlice.actions;
