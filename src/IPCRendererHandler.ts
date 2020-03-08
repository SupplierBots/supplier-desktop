import { ipcRenderer } from 'electron';
import {
  BROWSER_STATE_CHANGE,
  BrowserStatePayload,
  SET_BROWSER_EMAIL,
  GET_SAME_EMAILS,
} from 'IPCEvents';
import store from 'store/configureStore';
import { setActive, setAccountEmail } from 'store/browsers/actions';

import { ipcRenderer as ipc } from 'electron-better-ipc';

const setupListeners = () => {
  ipcRenderer.on(BROWSER_STATE_CHANGE, (e, { id, status }: BrowserStatePayload) => {
    store.dispatch(setActive(id, status));
  });

  ipc.on(SET_BROWSER_EMAIL, (e, { id, email }: { id: string; email: string }) => {
    store.dispatch(setAccountEmail(id, email));
  });

  ipc.answerMain(GET_SAME_EMAILS, (email: string) => {
    const sameEmails = store.getState().browsers.filter(b => b.accountEmail.includes(email));
    return sameEmails;
  });
};

export { setupListeners };
