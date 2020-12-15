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
  ticketDecline,
  bParameter,
  queued,
  processingAttempt,
  checkoutDelay,
  taskAttempt,
  startTime,
  atcTime,
  submitTime,
  usedProxy,
  cardinalBypass,
  userAgent,
  sitekey,
  billingErrors,
}: Checkout) => {
  firestore.collection(`checkouts/${site}/${status}`).add({
    date: firebase.firestore.Timestamp.now(),
    queued,
    processingAttempt,
    checkoutDelay,
    taskAttempt,
    startTime,
    atcTime,
    submitTime,
    usedProxy,
    cardinalBypass,
    userAgent,
    sitekey,
    billingErrors,
    checkoutTime,
    item,
    ticketDecline,
    bParameter,
    userId,
    region,
  });
};
