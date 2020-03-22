import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { License } from 'main/types/License';

export interface AuthState {
  readonly verifying: boolean;
  readonly authenticated: boolean;
  readonly uid: string;
  readonly error: string;
  readonly license: License | null;
  readonly loginTime: number;
}

export const initialState: AuthState = {
  verifying: false,
  authenticated: false,
  uid: '',
  error: '',
  license: null,
  loginTime: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn: (
      state,
      { payload }: PayloadAction<{ license: License; uid: string; loginTime: number }>,
    ) => {
      return {
        verifying: false,
        authenticated: true,
        error: '',
        license: payload.license,
        uid: payload.uid,
        loginTime: payload.loginTime,
      };
    },
    userLoggedOut: () => {
      return initialState;
    },
    setAuthError: (state, { payload }: PayloadAction<{ error: string }>) => {
      state.verifying = false;
      state.error = payload.error;
    },
    startVerifying: state => {
      state.verifying = true;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setAuthError, startVerifying } = authSlice.actions;
