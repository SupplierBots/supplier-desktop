import { UserDataActionTypes } from './userData/types';
import { AuthActionTypes } from './auth/types';
import routes from 'constants/routes';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, CallHistoryMethodAction } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { persistReducer, createTransform } from 'redux-persist';
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
  router: connectRouter(history),
} as const);

const key = 'c736b31a-fa1e-4c29-861a-7b6b409c0598';

const encryptTransform = createTransform(
  inboundState => {
    return CryptoJS.AES.encrypt(JSON.stringify(inboundState), key).toString();
  },
  outboundState => {
    const bytes = CryptoJS.AES.decrypt(outboundState, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
);

const persistConfig = {
  key: 'root',
  blacklist: ['auth', 'router'],
  transforms: [encryptTransform],
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export function* rootSaga() {
  yield all([
    fork(watchAuth),
    // * fork() any other store sagas down here...
  ]);
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = CallHistoryMethodAction | AuthActionTypes | UserDataActionTypes; // | OtherActionTypes
