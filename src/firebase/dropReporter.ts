import { firestore } from './config';
import firebase from 'firebase';
import { Checkout } from 'main/types/Checkout';

export const reportCheckout = ({ status, region, site, checkoutTime, items, userId }: Checkout) => {
  firestore.collection(`checkouts/${site}/${status}`).add({
    date: firebase.firestore.Timestamp.now(),
    checkoutTime,
    items,
    userId,
    region,
  });
};
