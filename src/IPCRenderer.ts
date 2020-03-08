import {
  BROWSER_STATE_CHANGE,
  BrowserStatePayload,
  SET_BROWSER_EMAIL,
  GET_SAME_EMAILS,
  SETUP_BROWSER,
  VERIFY_CHROME,
  ChromiumVerifiedPayload,
  DOWNLOAD_CHROMIUM,
} from './IPC/IPCEvents';

import store from 'store/configureStore';
import { setActive, setAccountEmail } from 'store/browsers/actions';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import { BrowserData } from 'types/BrowserData';

export abstract class IPCRenderer {
  private constructor() {}
  public static registerListeners = () => {
    ipc.on(BROWSER_STATE_CHANGE, (e, { id, status }: BrowserStatePayload) => {
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

  public static setupBrowser = (data: BrowserData) => {
    ipc.send(SETUP_BROWSER, data);
  };

  public static verifyChromium = async () => {
    const result = await ipc.callMain<null, ChromiumVerifiedPayload>(VERIFY_CHROME);
    return result;
  };

  public static downloadChromium = () => {
    ipc.send(DOWNLOAD_CHROMIUM);
  };
}
