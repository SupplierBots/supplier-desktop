import { Action } from 'redux';
export type LastVisitedType = 'products' | 'profiles' | 'proxies';

export interface LastVisitedState {
  readonly products: string;
  readonly profiles: string;
  readonly proxies: string;
}

export const SET_LAST_VISITED = 'SET_LAST_VISITED';

export interface SetLastVisitedAction extends Action {
  type: typeof SET_LAST_VISITED;
  visitedType: LastVisitedType;
  value: string;
}

export type LastVisitedActionTypes = SetLastVisitedAction;
