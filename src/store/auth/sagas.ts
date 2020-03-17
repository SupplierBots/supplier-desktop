import { reduxSagaFirebase } from 'firebase/config';
import {
  LOGIN_ATTEMPT,
  License,
  LoginAttemptAction,
  START_WATCHING_LOGIN_TIME,
  StartWatchingLoginTimeAction,
  CreateAccountAttemptAction,
  CREATE_ACCOUNT_ATTEMPT,
  INITIATE_USER_LOGOUT,
  InitiateUserLogoutAction,
  STOP_WATCHING_LOGIN_TIME,
} from './types';
import { put, takeEvery, call, take } from 'redux-saga/effects';
import {
  startWatchingLoginTime,
  loginAttempt,
  initiateUserLogout,
  stopWatchingLoginTime,
} from './actions';
import { FirebaseError } from 'firebase';
import { firestore } from 'firebase';

import { push } from 'connected-react-router';
import routes from 'constants/routes';
import { userLoggedOut, setAuthError, userLoggedIn, startVerifying } from './authSlice';

enum FirestoreType {
  Collection = 'collection',
  Document = 'document',
}

export function* loginAttemptSaga({ credentials }: LoginAttemptAction) {
  yield put(startVerifying());

  try {
    const response = yield call(
      reduxSagaFirebase.auth.signInWithEmailAndPassword,
      credentials.email,
      credentials.password,
    );
    const uid = response.user.uid;
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `users/${uid}/readonly/license`,
    );
    const license = snapshot.data() as License;

    if (!license || license.expirationDate < Date.now()) {
      yield put(userLoggedOut());
      yield put(setAuthError({ error: 'License expired' }));
      return;
    }
    const authData = {
      verifying: false,
      authenticated: true,
      error: '',
      license,
      uid,
    };
    const loginTime = yield Date.now();
    console.log(loginTime);
    yield call(
      reduxSagaFirebase.firestore.updateDocument,
      `users/${uid}`,
      'lastLogin',
      loginTime,
      'loggedIn',
      true,
    );

    yield put(startWatchingLoginTime(uid, loginTime));
    yield put(userLoggedIn({ auth: authData }));
    yield put(push(routes.dashboard));
  } catch (error) {
    const { code } = error as FirebaseError;
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
      yield put(setAuthError({ error: 'Invalid credentials' }));
    } else {
      yield put(setAuthError({ error: "Couldn't verify credentials" }));
    }
  }
}

export function* startWatchingLoginTimeSaga({ uid, loginTime }: StartWatchingLoginTimeAction) {
  const channel = reduxSagaFirebase.firestore.channel(`users/${uid}`, FirestoreType.Document);

  yield takeEvery(channel, function*(output) {
    const snapshot = output as firestore.DocumentSnapshot;
    const snapshotData = snapshot.data();
    if (snapshotData && snapshotData.lastLogin) {
      const updatedTime = snapshotData.lastLogin;
      if (updatedTime > loginTime) {
        yield put(initiateUserLogout(uid));
      }
    } else {
      yield put(initiateUserLogout(uid));
    }
  });
  yield take(STOP_WATCHING_LOGIN_TIME);
  channel.close();
}

export function* createAccountAttemptSaga({ credentials }: CreateAccountAttemptAction) {
  yield put(startVerifying());
  try {
    const response = yield fetch(
      'https://us-central1-safedrop-83b20.cloudfunctions.net/createAccount',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );

    const status = yield response.json();
    if (!status.success) {
      yield put(setAuthError(status.message));
      return;
    }
    if (status.success) {
      yield put(loginAttempt(credentials));
    }
  } catch {
    yield put(setAuthError({ error: "Couldn't verify credentials" }));
  }
}

export function* initiateUserLogoutSaga({ uid }: InitiateUserLogoutAction) {
  try {
    yield put(stopWatchingLoginTime());
    yield call(reduxSagaFirebase.firestore.updateDocument, `users/${uid}`, 'loggedIn', false);
    yield call(reduxSagaFirebase.auth.signOut);
    yield put(userLoggedOut());
  } catch {
    console.log('Error while logout');
    yield put(userLoggedOut());
  }
}

export function* watchAuth() {
  yield takeEvery(LOGIN_ATTEMPT, loginAttemptSaga);
  yield takeEvery(CREATE_ACCOUNT_ATTEMPT, createAccountAttemptSaga);
  yield takeEvery(INITIATE_USER_LOGOUT, initiateUserLogoutSaga);
  yield takeEvery(START_WATCHING_LOGIN_TIME, startWatchingLoginTimeSaga);
}
