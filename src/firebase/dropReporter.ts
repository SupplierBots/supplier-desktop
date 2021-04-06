import { firestore } from './config';
import firebase from 'firebase';
import { Checkout } from 'main/types/Checkout';
import moment from 'moment';

const timestamp = firebase.firestore.Timestamp;
export const reportCheckout = ({
  status,
  region,
  site,
  checkoutTime,
  item,
  userId,
  highTraffic,
  bParameter,
  queued,
  processingAttempt,
  checkoutDelay,
  taskAttempt,
  startTimestamp,
  atcTimestamp,
  submitTimestamp,
  usedProxy,
  sitekey,
  billingErrors,
  modifiedButtons,
  safeMode,
}: Checkout) => {
  firestore.collection(`checkouts/${site}/${status}`).add({
    date: timestamp.now(),
    startTimestamp: timestamp.fromDate(moment(startTimestamp).toDate()),
    atcTimestamp: timestamp.fromDate(moment(atcTimestamp).toDate()),
    submitTimestamp: timestamp.fromDate(moment(submitTimestamp).toDate()),
    queued,
    processingAttempt,
    checkoutDelay,
    taskAttempt,
    usedProxy,
    sitekey,
    billingErrors,
    checkoutTime,
    item,
    highTraffic,
    bParameter,
    userId,
    region,
    modifiedButtons,
    safeMode,
  });
};
