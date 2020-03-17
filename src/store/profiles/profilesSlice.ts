import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'main/types/Profile';

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState: [] as Profile[],
  reducers: {
    addProfile: (state, { payload }: PayloadAction<{ profile: Profile }>) => {
      state.push(payload.profile);
    },
    updateProfile: (state, { payload }: PayloadAction<{ profile: Profile }>) => {
      return state.map(p => {
        return p.id === payload.profile.id ? payload.profile : p;
      });
    },
    deleteProfile: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(p => p.id !== payload.id);
    },
    deleteAllProfiles: () => {
      return [];
    },
  },
});

export const {
  addProfile,
  updateProfile,
  deleteProfile,
  deleteAllProfiles,
} = profilesSlice.actions;
