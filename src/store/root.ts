import { UserDataActionTypes } from './userData/types';
import { AuthActionTypes } from './auth/types';
import routes from 'constants/routes';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, CallHistoryMethodAction } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import { authReducer } from './auth/reducers';
import { userDataReducer } from './userData/reducers';
import { watchAuth } from './auth/sagas';

export const history = createMemoryHistory({
  initialEntries: [routes.startup],
  initialIndex: 0,
});

export const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  router: connectRouter(history),
} as const);

export function* rootSaga() {
  yield all([
    fork(watchAuth),
    // * fork() any other store sagas down here...
  ]);
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = CallHistoryMethodAction | AuthActionTypes | UserDataActionTypes; // | OtherActionTypes
