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
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
  UPDATE_DOWNLOAD_ERROR,
  DOWNLOAD_UPDATE,
  RELAUNCH,
  REPORT_CHECKOUT,
  RESET_TIMER_STATE,
  GET_PROXY,
} from './IPCEvents';

import store from 'store/configureStore';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import { BrowserData } from 'main/types/BrowserData';
import { Task } from 'main/types/Task';
import { updateTask } from 'store/tasks/tasksSlice';
import { setAccountEmail, setActive } from 'store/browsers/browsersSlice';
import { UpdateInfo, UpdateDownloadedEvent } from 'electron-updater';
import { ProgressInfo } from 'builder-util-runtime';
import { push } from 'connected-react-router';
import routes from 'constants/routes';
import {
  resetUpdateState,
  setAvailableUpdate,
  setUpdateProgress,
  setUpdateComplete,
  setUpdateError,
} from 'store/update/updateSlice';
import { incrementCheckouts } from 'store/statistics/statisticsSlice';
import { SchedulerState } from 'main/types/SchedulerState';
import { setTimerState } from 'store/controller/controllerSlice';
import { CheckoutData } from 'main/types/Checkout';
import { reportCheckout } from 'firebase/dropReporter';

export abstract class IPCRenderer {
  private constructor() {}
  public static registerListeners = () => {
    store.dispatch(resetUpdateState());

    ipc.on(BROWSER_STATE_CHANGE, (e, { id, status }: BrowserStatePayload) => {
      store.dispatch(setActive({ id, isActive: status }));
    });

    ipc.on(SET_BROWSER_EMAIL, (e, { id, email }: { id: string; email: string }) => {
      store.dispatch(setAccountEmail({ id, email }));
    });

    ipc.on(UPDATE_TASK_STATUS, (e, task: Task) => {
      store.dispatch(updateTask({ item: task }));
    });

    ipc.on(REPORT_CHECKOUT, (e, checkoutData: CheckoutData) => {
      reportCheckout({
        ...checkoutData,
        userId: store.getState().auth.uid,
      });
      if (checkoutData.status !== 'paid') return;
      store.dispatch(incrementCheckouts());
    });

    ipc.on(RESET_TIMER_STATE, e => {
      store.dispatch(setTimerState({ active: false }));
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

    ipc.answerMain(GET_PROXY, (id: string) => {
      const proxy = store.getState().proxies.find(p => p.id === id);
      return proxy;
    });

    ipc.on(UPDATE_AVAILABLE, (e, info: UpdateInfo) => {
      if (store.getState().update.inProgress) return;
      store.dispatch(setAvailableUpdate({ version: info.version }));
    });

    ipc.on(UPDATE_DOWNLOAD_PROGRESS, (e, info: ProgressInfo) => {
      store.dispatch(setUpdateProgress({ percentage: info.percent }));
    });

    ipc.on(UPDATE_DOWNLOADED, (e, info: UpdateDownloadedEvent) => {
      store.dispatch(setUpdateComplete());
    });

    ipc.on(UPDATE_DOWNLOAD_ERROR, (e, error: Error) => {
      if (!store.getState().update.inProgress) return;
      store.dispatch(setUpdateError());
      setTimeout(() => {
        store.dispatch(resetUpdateState());
        store.dispatch(push(routes.dashboard));
      }, 3000);
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

  public static startTasks = (tasks: Task[], scheduler: SchedulerState) => {
    ipc.send(START_TASKS, tasks, scheduler);
  };

  public static stopTasks = () => {
    ipc.send(STOP_TASKS);
  };

  public static downloadUpdate = () => {
    ipc.send(DOWNLOAD_UPDATE);
  };

  public static relaunch = () => {
    ipc.send(RELAUNCH);
  };
}
