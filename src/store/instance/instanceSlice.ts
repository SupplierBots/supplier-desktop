import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instance } from 'main/types/Instance';
import uuid from 'uuid/v4';
const initialState: Instance = {
  id: uuid(),
};

export const instanceSlice = createSlice({
  name: 'instance',
  initialState,
  reducers: {
    setInstanceId: (s, { payload }: PayloadAction<{ id: string }>) => {
      return payload;
    },
  },
});

export const { setInstanceId } = instanceSlice.actions;
