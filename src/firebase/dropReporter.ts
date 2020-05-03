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
}: Checkout) => {
  firestore.collection(`checkouts/${site}/${status}`).add({
    date: firebase.firestore.Timestamp.now(),
    checkoutTime,
    item,
    ticketDecline,
    userId,
    region,
  });
};
