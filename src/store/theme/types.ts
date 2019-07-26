import { DefaultTheme } from 'styled-components/macro';
import { Action } from 'redux';

export interface ThemeState {
  readonly active: DefaultTheme;
}

export const TOGGLE_THEME = 'TOGGLE_THEME';

export interface ToggleThemeAction extends Action {
  type: typeof TOGGLE_THEME;
}

export type ThemeActionTypes = ToggleThemeAction;
