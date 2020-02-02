import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { rootSaga, history, persistedReducer } from './root';
import { persistStore } from 'redux-persist';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(history);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, router)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
