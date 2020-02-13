import { BrowserDataActionTypes } from './browsers/types';
import { browsersReducer } from './browsers/reducers';
import { controllerReducer } from './controller/reducers';
import { ControllerActionTypes } from './controller/types';
import { LastVisitedActionTypes } from './lastVisited/types';
import { lastVisitedReducer } from './lastVisited/reducers';
import { UserDataActionTypes } from './userData/types';
import { AuthActionTypes } from './auth/types';
import routes from 'constants/routes';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, CallHistoryMethodAction } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { persistReducer, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/reducers';
import { userDataReducer } from './userData/reducers';
import { watchAuth } from './auth/sagas';
import CryptoJS from 'crypto-js';

export const history = createMemoryHistory({
  initialEntries: [routes.startup],
  initialIndex: 0,
});

export const rootReducer = combineReducers({
  auth: authReducer,
  userData: userDataReducer,
  lastVisited: lastVisitedReducer,
  controller: controllerReducer,
  browsers: browsersReducer,
  router: connectRouter(history),
} as const);

const key = String.fromCharCode(
  ...[99, 55, 51, 54, 98, 51, 49, 97, 102, 97, 49, 101, 52, 99, 50, 57],
);

const encryptTransform = createTransform(
  inboundState => {
    return CryptoJS.AES.encrypt(JSON.stringify(inboundState), key).toString();
  },
  outboundState => {
    const bytes = CryptoJS.AES.decrypt(outboundState, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
);

const persistConfig: PersistConfig<AppState> = {
  key: 'root',
  blacklist: ['auth', 'router', 'controller'],
  transforms: [encryptTransform],
  storage,
  throttle: 1000,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export function* rootSaga() {
  yield all([
    fork(watchAuth),
    // * fork() any other store sagas down here...
  ]);
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions =
  | CallHistoryMethodAction
  | AuthActionTypes
  | UserDataActionTypes
  | LastVisitedActionTypes
  | ControllerActionTypes
  | BrowserDataActionTypes; // | OtherActionTypes
