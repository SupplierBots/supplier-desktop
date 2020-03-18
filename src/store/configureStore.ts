import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { rootSaga, history, persistedReducer, RootState } from './root';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware<RootState>();

const router = routerMiddleware(history);

const serializableOptions: unknown = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};

const middleware = [
  sagaMiddleware,
  router,
  ...getDefaultMiddleware<RootState>({
    thunk: true,
    immutableCheck: true,
    serializableCheck: serializableOptions as true,
  }),
] as const;

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export default store;
