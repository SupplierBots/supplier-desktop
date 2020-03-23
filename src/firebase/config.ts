import firebase from 'firebase/app';
import ReduxSagaFirebase from 'redux-saga-firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAYeMxaOOKAmin-V6CQr1M49If6AMFAcGE',
  authDomain: 'safedrop-83b20.firebaseapp.com',
  databaseURL: 'wss://safedrop-83b20.firebaseio.com',
  projectId: 'safedrop-83b20',
  storageBucket: 'safedrop-83b20.appspot.com',
  messagingSenderId: '741398503521',
  appId: '1:741398503521:web:6be90b40121230d3',
};
process.title = 'Supplier';
const firebaseApp = firebase.initializeApp(config);
export const firestore = firebase.firestore();

export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);
