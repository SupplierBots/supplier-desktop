import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UpdateState {
  number: string;
  isUpdateAvailable: boolean;
  downloadPercentage: number;
  inProgress: boolean;
  downloading: boolean;
  error: boolean;
}

const initialState: UpdateState = {
  number: '0.0.1',
  isUpdateAvailable: false,
  downloadPercentage: 0,
  inProgress: false,
  downloading: false,
  error: false,
};

export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setAvailableUpdate: (s, { payload }: PayloadAction<{ version: string }>) => {
      return {
        number: payload.version,
        isUpdateAvailable: true,
        downloading: false,
        downloadPercentage: 0,
        inProgress: false,
        error: false,
      };
    },
    setUpdateStart: state => {
      state.downloading = true;
      state.inProgress = true;
    },
    setUpdateProgress: (state, { payload }: PayloadAction<{ percentage: number }>) => {
      state.downloadPercentage = payload.percentage;
    },
    setUpdateComplete: state => {
      state.downloading = false;
    },
    setUpdateError: state => {
      state.error = true;
      state.downloading = false;
    },
    resetUpdateState: () => {
      return initialState;
    },
  },
});

export const {
  setAvailableUpdate,
  setUpdateProgress,
  setUpdateComplete,
  setUpdateError,
  resetUpdateState,
  setUpdateStart,
} = updateSlice.actions;
