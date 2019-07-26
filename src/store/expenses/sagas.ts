import { put, delay, takeEvery } from 'redux-saga/effects';
import { START_RESET_EXPENSES } from './types';
import { resetExpenses, disableExpenses } from './actions';

export function* startResetExpensesSaga() {
  yield put(disableExpenses());
  yield delay(2000);
  yield put(resetExpenses());
}

/*
* Example with action passed as param
function* getExpenseSaga(action: GetExpenseAction) {
  try {
    const response = yield request.get(action.url);
    yield put(addExpense(response.expense));
  } catch (err) {
    yield put(showExpenseError(err));
  }
}
*/

export function* watchExpenses() {
  yield takeEvery(START_RESET_EXPENSES, startResetExpensesSaga);
  //* Add more expenses related sagas here
  //yield TakeEvery(OTHER_EXPENSE_ACTION, otherExpenseSaga);
}
