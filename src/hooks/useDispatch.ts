import { Dispatch } from 'redux';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppActions } from 'store/root';

export const useDispatch = (): Dispatch<AppActions> => {
  return useReduxDispatch<Dispatch<AppActions>>();
};
