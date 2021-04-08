import { createAction } from '@reduxjs/toolkit';
import { LoginCredentials } from 'main/types/LoginCredentials';
import { RegisterCredentials } from 'main/types/RegisterCredentials';
import { docData } from 'rxfire/firestore';
import { auth, firestore } from 'firebase/config';
import { userLoggedIn, userLoggedOut, setAuthError, startVerifying } from './authSlice';
import { filter, switchMap, take, map, catchError, last, takeUntil, first } from 'rxjs/operators';
import { StoreObservable } from 'store/root';
import { License } from 'main/types/License';
import { concat, of, from, EMPTY } from 'rxjs';
import { push } from 'connected-react-router';
import routes from 'constants/routes';
import { FirebaseError } from 'firebase';
import axios, { AxiosResponse } from 'axios';
import { config } from 'config';
import { fetchDashboardData } from 'store/dashboard/dashboardEpics';
import { fetchProducts } from 'store/products/productsEpics';

export const loginAttempt = createAction<{ credentials: LoginCredentials }>('auth/loginAttempt');
export const retreiveLicense = createAction<{ uid: string }>('auth/retreiveLicense');
export const registerAttempt = createAction<{ credentials: RegisterCredentials }>(
  'auth/registerAttempt',
);
export const initiateLogout = createAction<{ uid: string }>('auth/initiateLogout');

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface RemoteUserData {
  loggedIn: boolean;
  lastLogin: number;
}

export const loginEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(loginAttempt.match),
    switchMap(({ payload }) =>
      concat(
        of(startVerifying()),
        from(
          auth.signInWithEmailAndPassword(payload.credentials.email, payload.credentials.password),
        ).pipe(
          map(({ user }) => {
            if (!user) return setAuthError({ error: "Couldn't verify credentials" });
            return retreiveLicense({ uid: user.uid });
          }),
          catchError(parseFirebaseError),
        ),
      ),
    ),
  );

const parseFirebaseError = (error: FirebaseError) => {
  const { code } = error;
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return of(setAuthError({ error: 'Invalid credentials' }));
  } else {
    return of(setAuthError({ error: "Couldn't verify credentials" }));
  }
};

export const registerEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(registerAttempt.match),
    switchMap(({ payload }) =>
      concat(
        of(startVerifying()),
        from(
          axios.post<RegisterCredentials, AxiosResponse<RegisterResponse>>(
            config.registerUrl,
            payload.credentials,
          ),
        ).pipe(
          first(),
          map(({ data }) => {
            if (!data.success) {
              return setAuthError({ error: data.message });
            }
            return loginAttempt({ credentials: payload.credentials });
          }),
          catchError(() => of(setAuthError({ error: "Couldn't verify credentials" }))),
        ),
      ),
    ),
  );

export const licenseEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(retreiveLicense.match),
    switchMap(({ payload }) =>
      docData<License>(firestore.doc(`users/${payload.uid}/readonly/license`)).pipe(
        first(),
        switchMap(license => {
          if (!license || license.expirationDate < Date.now()) {
            return concat(of(userLoggedOut()), of(setAuthError({ error: 'License Expired' })));
          }
          return concat(
            of(fetchDashboardData()),
            of(fetchProducts()),
            from(
              firestore
                .doc(`users/${payload.uid}`)
                .update({ loggedIn: true, lastLogin: Date.now() }),
            ).pipe(
              switchMap(() =>
                of(
                  userLoggedIn({ license, uid: payload.uid, loginTime: Date.now() }),
                  push(routes.dashboard),
                ),
              ),
              catchError(() => of(setAuthError({ error: 'Internal server error' }))),
            ),
          );
        }),
      ),
    ),
  );

export const logoutEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(initiateLogout.match),
    switchMap(({ payload }) =>
      from(firestore.doc(`users/${payload.uid}`).update({ loggedIn: false })).pipe(
        switchMap(() => concat(from(auth.signOut()), of(userLoggedOut())).pipe(last())),
      ),
    ),
  );

export const authMonitorEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(userLoggedIn.match),
    switchMap(({ payload }) =>
      docData<RemoteUserData>(firestore.doc(`users/${payload.uid}`)).pipe(
        takeUntil(action$.pipe(filter(userLoggedOut.match))),
        switchMap(({ lastLogin }) => {
          if (lastLogin > payload.loginTime) return of(initiateLogout({ uid: payload.uid }));
          return EMPTY;
        }),
        catchError(e => of(initiateLogout({ uid: payload.uid }))),
      ),
    ),
  );
