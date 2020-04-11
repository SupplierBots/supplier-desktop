import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ControllerState {
  isTimerActive: boolean;
  chromiumPath: string;
  appData: string;
  version: string;
}

const initialState: ControllerState = {
  isTimerActive: false,
  chromiumPath: '',
  appData: '',
  version: '',
};

export const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setAppDetails: (state, { payload }: PayloadAction<{ path: string; version: string }>) => {
      state.chromiumPath = payload.path;
      state.version = payload.version;
    },
    setAppDataPath: (state, { payload }: PayloadAction<{ path: string }>) => {
      state.appData = payload.path;
    },
    setAppVersion: (state, { payload }: PayloadAction<{ version: string }>) => {
      state.version = payload.version;
    },
    setTimerState: (state, { payload }: PayloadAction<{ active: boolean }>) => {
      state.isTimerActive = payload.active;
    },
  },
});

export const { setAppDetails, setAppDataPath, setTimerState } = controllerSlice.actions;
