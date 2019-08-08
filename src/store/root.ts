import { AuthActionTypes } from './auth/types';
import routes from 'constants/routes';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import { authReducer } from './auth/reducers';

export const history = createMemoryHistory({
  initialEntries: [routes.startup],
  initialIndex: 0,
});

export const rootReducer = combineReducers({
  auth: authReducer,
  router: connectRouter(history),
} as const);

export function* rootSaga() {
  yield all([
    //fork(watchExpenses),
    // * fork() any other store sagas down here...
  ]);
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = AuthActionTypes; // | OtherActionTypes
