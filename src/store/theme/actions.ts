import { TOGGLE_THEME, ThemeActionTypes } from './types';

export const toggleTheme = (): ThemeActionTypes => ({
  type: TOGGLE_THEME,
});
