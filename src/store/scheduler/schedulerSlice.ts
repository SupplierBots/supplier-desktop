import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchedulerState } from 'main/types/SchedulerState';

const initialState: SchedulerState = {
  enabled: false,
  date: '',
  time: '',
};

export const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState,
  reducers: {
    setScheduler: (s, { payload }: PayloadAction<{ data: SchedulerState }>) => {
      return payload.data;
    },
  },
});

export const { setScheduler } = schedulerSlice.actions;
