import routes from 'constants/routes';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import { themeReducer } from './theme/reducers';
import { expensesReducer } from './expenses/reducers';
import { watchExpenses } from './expenses/sagas';
import { ThemeActionTypes } from './theme/types';
import { ExpenseActionTypes } from './expenses/types';

export const history = createMemoryHistory({
  initialEntries: [routes.startup],
  initialIndex: 0,
});

export const rootReducer = combineReducers({
  expenses: expensesReducer,
  theme: themeReducer,
  router: connectRouter(history),
} as const);

export function* rootSaga() {
  yield all([
    fork(watchExpenses),
    // * fork() any other store sagas down here...
  ]);
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = ExpenseActionTypes | ThemeActionTypes; // | OtherActionTypes
