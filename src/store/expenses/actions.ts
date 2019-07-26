import { Expense } from '../../types/Expense';
import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  RESET_EXPENSES,
  START_RESET_EXPENSES,
  DISABLE_EXPENSES,
  ExpenseActionTypes,
} from './types';

export const addExpense = (expense: Expense): ExpenseActionTypes => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (id: string): ExpenseActionTypes => ({
  type: REMOVE_EXPENSE,
  id,
});

export const resetExpenses = (): ExpenseActionTypes => ({
  type: RESET_EXPENSES,
});

export const disableExpenses = (): ExpenseActionTypes => ({
  type: DISABLE_EXPENSES,
});

export const startResetExpenses = (): ExpenseActionTypes => ({
  type: START_RESET_EXPENSES,
});
