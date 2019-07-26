import { Action } from "redux";
import { Expense } from "../../types/Expense";

export interface ExpensesState {
  readonly items: Expense[];
  readonly disabled: boolean;
}

export const ADD_EXPENSE = "ADD_EXPENSE";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export const RESET_EXPENSES = "RESET_EXPENSES";
export const DISABLE_EXPENSES = "DISABLE_EXPENSES";
export const START_RESET_EXPENSES = "START_RESET_EXPENSES";

export interface AddExpenseAction extends Action {
  type: typeof ADD_EXPENSE;
  expense: Expense;
}

export interface RemoveExpenseAction extends Action {
  type: typeof REMOVE_EXPENSE;
  id: string;
}

export interface ResetExpensesAction extends Action {
  type: typeof RESET_EXPENSES;
}

export interface DisableExpensesAction extends Action {
  type: typeof DISABLE_EXPENSES;
}

export interface StartResetExpensesAction extends Action {
  type: typeof START_RESET_EXPENSES;
}

export type ExpenseActionTypes =
  | AddExpenseAction
  | RemoveExpenseAction
  | ResetExpensesAction
  | DisableExpensesAction
  | StartResetExpensesAction;
