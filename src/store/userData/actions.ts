import {
  UserDataActionTypes,
  UserDataItem,
  UserDataItemType,
  ADD_USER_DATA_ITEM,
  UPDATE_USER_DATA_ITEM,
  REMOVE_USER_DATA_ITEM,
} from './types';

export const addUserDataItem = (
  itemType: UserDataItemType,
  item: UserDataItem,
): UserDataActionTypes => ({
  type: ADD_USER_DATA_ITEM,
  itemType,
  item,
});

export const updateUserDataItem = (
  itemType: UserDataItemType,
  item: UserDataItem,
): UserDataActionTypes => ({
  type: UPDATE_USER_DATA_ITEM,
  itemType,
  item,
});

export const removeUserDataItem = (
  itemType: UserDataItemType,
  itemID: string,
): UserDataActionTypes => ({
  type: REMOVE_USER_DATA_ITEM,
  itemType,
  itemID,
});