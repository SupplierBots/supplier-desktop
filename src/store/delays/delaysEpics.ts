import { createAction } from '@reduxjs/toolkit';
import { firestore } from 'firebase/config';
import { Delays } from 'main/types/Delays';
import { docData } from 'rxfire/firestore';
import { of } from 'rxjs';
import { filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { userLoggedOut } from 'store/auth/authSlice';
import { StoreObservable } from 'store/root';
import { setDelays } from './delaysSlice';

export const fetchDelays = createAction('delays/fetch');

const delaysRef = firestore.collection('desktop').doc('delays');

export const fetchDelaysEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(fetchDelays.match),
    switchMap(() =>
      docData<Delays>(delaysRef).pipe(
        takeUntil(action$.pipe(filter(userLoggedOut.match))),
        mergeMap(delays => {
          return of(setDelays({ delays }));
        }),
      ),
    ),
  );
