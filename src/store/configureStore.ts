import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { rootSaga, history, persistedReducer } from './root';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(history);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  sagaMiddleware,
  router,
];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
