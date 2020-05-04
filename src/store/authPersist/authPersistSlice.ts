import { LoginCredentials } from './../../main/types/LoginCredentials';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthPersist {
  credentials: LoginCredentials;
  remember: boolean;
}

const initialState: AuthPersist = {
  credentials: {
    email: '',
    password: '',
  },
  remember: false,
};

export const authPersistSlice = createSlice({
  name: 'authPersist',
  initialState,
  reducers: {
    saveCredentials: (s, { payload }: PayloadAction<{ credentials: LoginCredentials }>) => {
      return {
        credentials: payload.credentials,
        remember: true,
      };
    },
    resetCredentials: () => {
      return initialState;
    },
  },
});

export const { saveCredentials, resetCredentials } = authPersistSlice.actions;
