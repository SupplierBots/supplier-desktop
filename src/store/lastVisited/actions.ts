import { LastVisitedType, LastVisitedActionTypes, SET_LAST_VISITED } from './types';

export const setLastVisited = (
  visitedType: LastVisitedType,
  value: string,
): LastVisitedActionTypes => ({
  type: SET_LAST_VISITED,
  visitedType,
  value,
});
