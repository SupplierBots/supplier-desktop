import { Action } from 'redux';
import { Product } from 'types/Product';
import { Profile } from 'types/Profile';
import { Proxy } from 'types/Proxy';

export type UserDataItemType = 'products' | 'profiles' | 'proxies';
export type UserDataItem = Profile | Product | Proxy;

export interface UserDataState {
  readonly products: Product[];
  readonly profiles: Profile[];
  readonly proxies: Proxy[];
}

export const ADD_USER_DATA_ITEM = 'ADD_DATA_ITEM';
export const UPDATE_USER_DATA_ITEM = 'UPDATE_DATA_ITEM';
export const REMOVE_USER_DATA_ITEM = 'REMOVE_DATA_ITEM';

export interface AddUserDataItemAction extends Action {
  type: typeof ADD_USER_DATA_ITEM;
  itemType: UserDataItemType;
  item: UserDataItem;
}

export interface UpdateUserDataItemAction extends Action {
  type: typeof UPDATE_USER_DATA_ITEM;
  itemType: UserDataItemType;
  item: UserDataItem;
}

export interface RemoveUserDataItemAction extends Action {
  type: typeof REMOVE_USER_DATA_ITEM;
  itemType: UserDataItemType;
  itemID: string;
}

export type UserDataActionTypes =
  | AddUserDataItemAction
  | UpdateUserDataItemAction
  | RemoveUserDataItemAction;
