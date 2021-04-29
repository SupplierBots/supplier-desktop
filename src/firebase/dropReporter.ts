import { firestore } from './config';
import firebase from 'firebase';
import { Checkout } from 'main/types/Checkout';
import moment from 'moment';

const timestamp = firebase.firestore.Timestamp;
export const reportCheckout = ({
  status,
  region,
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
  finishedTimestamp,
  cca,
  captchaToken,
}: Checkout) => {
  firestore.collection(`checkouts/desktop/${status}`).add({
    date: timestamp.now(),
    startTimestamp: timestamp.fromDate(moment(startTimestamp).toDate()),
    atcTimestamp: timestamp.fromDate(moment(atcTimestamp).toDate()),
    submitTimestamp: timestamp.fromDate(moment(submitTimestamp).toDate()),
    finishedTimestamp: timestamp.fromDate(moment(finishedTimestamp).toDate()),
    cca,
    captchaToken,
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
  });
};
