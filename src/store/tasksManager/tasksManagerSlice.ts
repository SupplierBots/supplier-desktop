import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksManagerState } from 'main/types/TasksManagerState';

const initialState: TasksManagerState = {
  processingAction: false,
};

export const tasksManagerSlice = createSlice({
  name: 'tasksManager',
  initialState,
  reducers: {
    setProcessingAction: (s, { payload }: PayloadAction<{ processingAction: boolean }>) => {
      return { processingAction: payload.processingAction };
    },
  },
});

export const { setProcessingAction } = tasksManagerSlice.actions;
