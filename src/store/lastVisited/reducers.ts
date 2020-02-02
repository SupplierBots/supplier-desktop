import { LastVisitedState, LastVisitedActionTypes, SET_LAST_VISITED } from './types';

const initialState: LastVisitedState = {
  products: '',
  profiles: '',
  proxies: '',
};

export const lastVisitedReducer = (
  state = initialState,
  action: LastVisitedActionTypes,
): LastVisitedState => {
  switch (action.type) {
    case SET_LAST_VISITED: {
      return {
        ...state,
        [action.visitedType]: action.value,
      };
    }
    default:
      return state;
  }
};
