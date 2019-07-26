import { useSelector as useReduxSelector } from 'react-redux';
import { AppState } from '../store/root';

export const useSelector = <S>(selector: (state: AppState) => S): S => {
  return useReduxSelector<AppState, any>(selector);
};
