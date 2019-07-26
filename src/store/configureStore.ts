import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
// import isDev from 'electron-is-dev';
import { rootReducer, rootSaga, history } from './root';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(history);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, router)));

sagaMiddleware.run(rootSaga);

export default store;
