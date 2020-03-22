import { routerMiddleware } from 'connected-react-router';
import { history, persistedReducer, RootState, rootEpic } from './root';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import {
  configureStore,
  getDefaultMiddleware,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const router = routerMiddleware(history);

interface DefaultMiddlewareOptions {
  thunk: false;
  immutableCheck: boolean;
  serializableCheck: SerializableStateInvariantMiddlewareOptions;
}

const middleware = [
  epicMiddleware,
  router,
  ...getDefaultMiddleware<RootState, DefaultMiddlewareOptions>({
    thunk: false,
    immutableCheck: true,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
] as const;

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export default store;
