import { createAction } from '@reduxjs/toolkit';
import { StoreObservable } from 'store/root';
import { filter, switchMap, mergeMap, map, takeUntil } from 'rxjs/operators';
import { merge, of, EMPTY } from 'rxjs';
import { firestore } from 'firebase/config';
import { docData, collectionData } from 'rxfire/firestore';
import {
  setInformation,
  DashboardInformation,
  setSupremeDroplists,
  setPalaceDroplists,
  setSupremeTimes,
  setPalaceTimes,
} from './dashboardSlice';

import { userLoggedOut } from 'store/auth/authSlice';
import moment from 'moment';
import { Timestamp } from 'main/types/Timestamp';
export const fetchDashboardData = createAction('dashboard/fetchDashboardData');

const supremeDroplistsRef = firestore
  .collection('dashboard/droplists/supreme')
  .orderBy('date', 'desc')
  .limit(2);

const palaceDroplistsRef = firestore
  .collection('dashboard/droplists/palace')
  .orderBy('date', 'desc')
  .limit(2);

const supremeTimesRef = firestore
  .collection('dashboard/times/supreme')
  .orderBy('date', 'desc')
  .limit(1);

const palaceTimesRef = firestore
  .collection('dashboard/times/palace')
  .orderBy('date', 'desc')
  .limit(1);

const messagesRef = firestore.doc('dashboard/messages');

const urlRegex = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const information$ = docData<DashboardInformation>(messagesRef).pipe(
  map(information => setInformation({ information })),
);

const isValidTimeUrl = (url?: string) => {
  if (!url) return true;
  return urlRegex.test(url);
};

const parseUrl = (url: string, fallback: string) => {
  return urlRegex.test(url) ? url : fallback;
};

const supremeDroplists$ = collectionData<{ date: Timestamp; week: number; link: string }>(
  supremeDroplistsRef,
).pipe(
  mergeMap(droplists => {
    if (droplists.length < 2) return EMPTY;
    const parsed = droplists.map(({ week, date, link }) => ({
      week,
      link: parseUrl(link, 'https://supremecommunity.com/'),
      date: moment(date.seconds * 1000).format('Do MMMM YY'),
    }));
    return of(setSupremeDroplists({ droplists: parsed }));
  }),
);

const palaceDroplists$ = collectionData<{ date: Timestamp; week: number; link: string }>(
  palaceDroplistsRef,
).pipe(
  mergeMap(droplists => {
    if (droplists.length < 2) return EMPTY;
    const parsed = droplists.map(({ week, date, link }) => ({
      week,
      link: parseUrl(link, 'https://palacedrop.com/'),
      date: moment(date.seconds * 1000).format('Do MMMM YY'),
    }));
    return of(setPalaceDroplists({ droplists: parsed }));
  }),
);

const supremeTimes$ = collectionData<{ date: Timestamp; week: number; eu?: string; us?: string }>(
  supremeTimesRef,
).pipe(
  mergeMap(times => {
    const [parsed] = times.map(({ week, eu, us }) => ({
      week,
      eu,
      us,
    }));
    if (!isValidTimeUrl(parsed.eu) || !isValidTimeUrl(parsed.us)) return EMPTY;
    return of(setSupremeTimes({ times: parsed }));
  }),
);

const palaceTimes$ = collectionData<{ date: Timestamp; week: number; eu?: string; us?: string }>(
  palaceTimesRef,
).pipe(
  mergeMap(times => {
    const [parsed] = times.map(({ week, eu, us }) => ({
      week,
      eu,
      us,
    }));
    if (!isValidTimeUrl(parsed.eu) || !isValidTimeUrl(parsed.us)) return EMPTY;
    return of(setPalaceTimes({ times: parsed }));
  }),
);

export const fetchDashboardEpic = (action$: StoreObservable) =>
  action$.pipe(
    filter(fetchDashboardData.match),
    switchMap(() =>
      merge(information$, supremeDroplists$, palaceDroplists$, supremeTimes$, palaceTimes$).pipe(
        takeUntil(action$.pipe(filter(userLoggedOut.match))),
      ),
    ),
  );
