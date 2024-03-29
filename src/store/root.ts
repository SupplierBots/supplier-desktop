import { authPersistSlice } from './authPersist/authPersistSlice';
import { webhookSlice } from './webhook/webhookSlice';
import routes from 'constants/routes';
import { connectRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { persistReducer, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
import { authSlice } from './auth/authSlice';
import { lastVisitedSlice } from './lastVisited/lastVisitedSlice';
import { controllerSlice } from './controller/controllerSlice';
import { profilesSlice } from './profiles/profilesSlice';
import { proxiesSlice } from './proxies/proxiesSlice';
import { harvestersSlice } from './harvesters/harvestersSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { tasksSlice } from './tasks/tasksSlice';
import store from './configureStore';
import { Observable } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import {
  loginEpic,
  licenseEpic,
  registerEpic,
  logoutEpic,
  authMonitorEpic,
} from './auth/authEpics';
import { config } from 'config';
import { fetchDashboardEpic } from './dashboard/dashboardEpics';
import { dashboardSlice } from './dashboard/dashboardSlice';
import { updateSlice } from './update/updateSlice';
import { statisticsSlice } from './statistics/statisticsSlice';
import { schedulerSlice } from './scheduler/schedulerSlice';
import { tasksManagerSlice } from './tasksManager/tasksManagerSlice';
import { fetchProductsEpic } from './products/productsEpics';
import { productsSlice } from './products/productsSlice';
import { delaysSlice } from './delays/delaysSlice';
import { fetchDelaysEpic } from './delays/delaysEpics';
import { instanceSlice } from './instance/instanceSlice';

export const history = createMemoryHistory({
  initialEntries: [routes.startup],
  initialIndex: 0,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type StoreObservable = Observable<ReturnType<AppDispatch>>;
export type StateObservable = Observable<RootState>;

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  authPersist: authPersistSlice.reducer,
  lastVisited: lastVisitedSlice.reducer,
  controller: controllerSlice.reducer,
  profiles: profilesSlice.reducer,
  proxies: proxiesSlice.reducer,
  harvesters: harvestersSlice.reducer,
  tasks: tasksSlice.reducer,
  dashboard: dashboardSlice.reducer,
  update: updateSlice.reducer,
  statistics: statisticsSlice.reducer,
  scheduler: schedulerSlice.reducer,
  tasksManager: tasksManagerSlice.reducer,
  webhook: webhookSlice.reducer,
  products: productsSlice.reducer,
  delays: delaysSlice.reducer,
  instance: instanceSlice.reducer,
  router: connectRouter(history),
});

export const rootEpic: Epic = combineEpics(
  loginEpic,
  registerEpic,
  licenseEpic,
  logoutEpic,
  authMonitorEpic,
  fetchDashboardEpic,
  fetchProductsEpic,
  fetchDelaysEpic,
);

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

const persistConfig: PersistConfig<RootState> = {
  key: `root${config.storageVersion}`,
  blacklist: ['auth', 'router', 'controller'],
  transforms: [encryptTransform],
  storage,
  throttle: 50,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
