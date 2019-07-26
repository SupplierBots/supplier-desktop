import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  RESET_EXPENSES,
  DISABLE_EXPENSES,
  ExpenseActionTypes,
  ExpensesState,
} from './types';

const initialState: ExpensesState = {
  items: [],
  disabled: false,
};

const expensesReducer = (state = initialState, action: ExpenseActionTypes): ExpensesState => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        items: [...state.items, action.expense],
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.id),
      };
    case RESET_EXPENSES:
      return {
        items: [],
        disabled: false,
      };
    case DISABLE_EXPENSES:
      return {
        ...state,
        disabled: true,
      };
    default:
      return state;
  }
};

export { expensesReducer };
