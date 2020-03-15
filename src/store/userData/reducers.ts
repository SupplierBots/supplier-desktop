import {
  UserDataState,
  UserDataActionTypes,
  ADD_USER_DATA_ITEM,
  UPDATE_USER_DATA_ITEM,
  REMOVE_USER_DATA_ITEM,
  REMOVE_ALL_ITEMS,
} from './types';
import { UserData } from 'main/types/UserData';

const initialState: UserDataState = {
  profiles: [],
  products: [],
  proxies: [],
  tasks: [],
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
        [action.itemType]: dataItems.map(item => {
          if (item.id !== action.item.id) {
            return item;
          }
          return {
            ...item,
            ...action.item,
          };
        }),
      };
    case REMOVE_USER_DATA_ITEM:
      return {
        ...state,
        [action.itemType]: dataItems.filter(item => item.id !== action.itemID),
      };
    case REMOVE_ALL_ITEMS: {
      return {
        ...state,
        [action.itemType]: [],
      };
    }
    default:
      return state;
  }
};
