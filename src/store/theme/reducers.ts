import { dark } from '../../themes/main';
import { ThemeState, ThemeActionTypes, TOGGLE_THEME } from './types';

const initialState: ThemeState = {
  active: dark,
};

const themeReducer = (state = initialState, action: ThemeActionTypes): ThemeState => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        active: state.active === dark ? dark : dark,
      };
    default:
      return state;
  }
};

export { themeReducer };
