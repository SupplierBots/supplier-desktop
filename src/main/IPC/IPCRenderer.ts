import {
  BROWSER_STATE_CHANGE,
  BrowserStatePayload,
  SET_BROWSER_EMAIL,
  GET_SAME_EMAILS,
  SETUP_BROWSER,
  VERIFY_CHROME,
  ChromiumVerifiedPayload,
  DOWNLOAD_CHROMIUM,
  WINDOW_MINIMIZE,
  WINDOW_CLOSE,
  START_TASKS,
  STOP_TASKS,
  GET_PROFILE,
  UPDATE_TASK_STATUS,
  GET_PRODUCT,
} from './IPCEvents';

import store from 'store/configureStore';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import { BrowserData } from 'main/types/BrowserData';
import { Task } from 'main/types/Task';
import { updateTask } from 'store/tasks/tasksSlice';
import { setAccountEmail, setActive } from 'store/browsers/browsersSlice';

export abstract class IPCRenderer {
  private constructor() {}
  public static registerListeners = () => {
    ipc.on(BROWSER_STATE_CHANGE, (e, { id, status }: BrowserStatePayload) => {
      store.dispatch(setActive({ id, isActive: status }));
    });

    ipc.on(SET_BROWSER_EMAIL, (e, { id, email }: { id: string; email: string }) => {
      store.dispatch(setAccountEmail({ id, email }));
    });

    ipc.on(UPDATE_TASK_STATUS, (e, task: Task) => {
      store.dispatch(updateTask({ task }));
    });

    ipc.answerMain(GET_SAME_EMAILS, (email: string) => {
      const sameEmails = store.getState().browsers.filter(b => b.accountEmail.includes(email));
      return sameEmails;
    });

    ipc.answerMain(GET_PROFILE, (id: string) => {
      const profile = store.getState().profiles.find(p => p.id === id);
      return profile;
    });

    ipc.answerMain(GET_PRODUCT, (id: string) => {
      const product = store.getState().products.find(p => p.id === id);
      return product;
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

  public static minimize = () => {
    ipc.send(WINDOW_MINIMIZE);
  };

  public static close = () => {
    ipc.send(WINDOW_CLOSE);
  };

  public static startTasks = (tasks: Task[]) => {
    ipc.send(START_TASKS, tasks);
  };

  public static stopTasks = () => {
    ipc.send(STOP_TASKS);
  };
}
