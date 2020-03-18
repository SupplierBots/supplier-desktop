import { RootState, AppDispatch } from 'store/root';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const useStateDispatch = () => useDispatch<AppDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
