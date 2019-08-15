import {
  UserDataState,
  UserDataActionTypes,
  ADD_USER_DATA_ITEM,
  UPDATE_USER_DATA_ITEM,
  REMOVE_USER_DATA_ITEM,
} from './types';
import { UserData } from 'types/UserData';

const initialState: UserDataState = {
  profiles: [],
  products: [],
  proxies: [],
};

export const userDataReducer = (
  state = initialState,
  action: UserDataActionTypes,
): UserDataState => {
  const dataItems = state[action.itemType] as UserData[];

  switch (action.type) {
    case ADD_USER_DATA_ITEM:
      return {
        ...state,
        [action.itemType]: [...dataItems, action.item],
      };
    case UPDATE_USER_DATA_ITEM:
      return {
        ...state,
        [action.itemType]: [...dataItems.filter(item => item.id !== action.item.id), action.item],
      };
    case REMOVE_USER_DATA_ITEM:
      return {
        ...state,
        [action.itemType]: dataItems.filter(item => item.id !== action.itemID),
      };
    default:
      return state;
  }
};
