import { Action } from 'redux';
import { Product } from 'types/Product';
import { Profile } from 'types/Profile';
import { Proxy } from 'types/Proxy';
import { Task } from 'types/Task';

export type UserDataItemType = 'products' | 'profiles' | 'proxies' | 'tasks';
export type UserDataItem = Product | Profile | Proxy | Task;

export interface UserDataState {
  readonly products: Product[];
  readonly profiles: Profile[];
  readonly proxies: Proxy[];
  readonly tasks: Task[];
}

export const ADD_USER_DATA_ITEM = 'ADD_DATA_ITEM';
export const UPDATE_USER_DATA_ITEM = 'UPDATE_DATA_ITEM';
export const REMOVE_USER_DATA_ITEM = 'REMOVE_DATA_ITEM';
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS';

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

export interface RemoveAllItemsAction extends Action {
  type: typeof REMOVE_ALL_ITEMS;
  itemType: UserDataItemType;
}

export type UserDataActionTypes =
  | AddUserDataItemAction
  | UpdateUserDataItemAction
  | RemoveUserDataItemAction
  | RemoveAllItemsAction;
