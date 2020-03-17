import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface License {
  expirationDate: number;
  key: string;
}

export interface AuthState {
  readonly verifying: boolean;
  readonly authenticated: boolean;
  readonly uid: string;
  readonly error: string;
  readonly license: License | null;
}

const initialState: AuthState = {
  verifying: false,
  authenticated: false,
  uid: '',
  error: '',
  license: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }: PayloadAction<{ auth: AuthState }>) => {
      return payload.auth;
    },
    userLoggedOut: state => {
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
