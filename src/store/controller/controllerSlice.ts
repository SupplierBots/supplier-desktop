import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControllerState {
  lockTasks: boolean;
  chromiumPath: string;
  appData: string;
}

const initialState: ControllerState = {
  lockTasks: false,
  chromiumPath: '',
  appData: '',
};

export const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setChromiumPath: (state, { payload }: PayloadAction<{ path: string }>) => {
      state.chromiumPath = payload.path;
    },
    setAppDataPath: (state, { payload }: PayloadAction<{ path: string }>) => {
      state.appData = payload.path;
    },
  },
});

export const { setChromiumPath, setAppDataPath } = controllerSlice.actions;
