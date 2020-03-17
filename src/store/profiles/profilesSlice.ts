import { SliceCaseReducers } from '@reduxjs/toolkit';
import { Profile } from 'main/types/Profile';
import { createUserDataSlice } from 'store/ createUserDataSlice';

export const profilesSlice = createUserDataSlice<Profile, SliceCaseReducers<Profile[]>>({
  name: 'profiles',
});

export const {
  add: addProfile,
  update: updateProfile,
  remove: removeProfile,
  removeAll: removeAllProfiles,
} = profilesSlice.actions;
