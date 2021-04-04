import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

import { UserData } from 'main/types/UserData';

export const createUserDataSlice = <
  T extends Pick<UserData, 'id'>,
  Reducers extends SliceCaseReducers<T[]>
>({
  name,
  reducers = {} as ValidateSliceCaseReducers<T[], Reducers>,
}: {
  name: string;
  reducers?: ValidateSliceCaseReducers<T[], Reducers>;
}) => {
  return createSlice({
    name,
    initialState: [] as T[],
    reducers: {
      add: (state: T[], { payload }: PayloadAction<{ item: T }>) => {
        state.push(payload.item);
      },
      update: (state: T[], { payload }: PayloadAction<{ item: T }>) => {
        return state.map(p => {
          return p.id === payload.item.id ? payload.item : p;
        });
      },
      remove: (state: T[], { payload }: PayloadAction<{ id: string }>) => {
        return state.filter(p => p.id !== payload.id);
      },
      removeAll: () => {
        return [];
      },
      ...reducers,
    },
  });
};
