import { firestore } from './config';
import firebase from 'firebase';
import { Checkout } from 'main/types/Checkout';

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
}: Checkout) => {
  firestore.collection(`checkouts/${site}/${status}`).add({
    date: firebase.firestore.Timestamp.now(),
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
    checkoutTime,
    item,
    highTraffic,
    bParameter,
    userId,
    region,
  });
};
