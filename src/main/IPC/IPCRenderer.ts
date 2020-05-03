import { WebhookConfig } from './../types/WebhookConfig';
import {
  HARVESTER_STATE_CHANGE,
  HarvesterStatePayload,
  SET_HARVESTER_EMAIL,
  GET_SAME_EMAILS,
  SETUP_HARVESTER,
  VERIFY_CHROME,
  ChromiumVerifiedPayload,
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
  SET_TASK_ACTIVITY,
  DOWNLOAD_CHROMIUM,
  TEST_WEBHOOK,
} from './IPCEvents';

import store from 'store/configureStore';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import { HarvesterData } from 'main/types/HarvesterData';
import { Task } from 'main/types/Task';
import { updateTaskStatus, setTaskActivity } from 'store/tasks/tasksSlice';
import { setAccountEmail, setActive } from 'store/harvesters/harvestersSlice';
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
import { RunnerState } from 'main/types/RunnerState';
import { setTimerState } from 'store/controller/controllerSlice';
import { CheckoutData } from 'main/types/Checkout';
import { reportCheckout } from 'firebase/dropReporter';
import { Proxy } from 'main/types/Proxy';
import { TaskStatus } from 'main/types/TaskStatus';

export abstract class IPCRenderer {
  private constructor() {}
  public static registerListeners = () => {
    store.dispatch(resetUpdateState());

    ipc.on(HARVESTER_STATE_CHANGE, (e, { id, status }: HarvesterStatePayload) => {
      store.dispatch(setActive({ id, isActive: status }));
    });

    ipc.on(SET_HARVESTER_EMAIL, (e, { id, email }: { id: string; email: string }) => {
      store.dispatch(setAccountEmail({ id, email }));
    });

    ipc.on(UPDATE_TASK_STATUS, (e, status: { id: string; status: TaskStatus }) => {
      store.dispatch(updateTaskStatus(status));
    });

    ipc.on(SET_TASK_ACTIVITY, (e, state: { id: string; isActive: boolean }) => {
      store.dispatch(setTaskActivity(state));
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
      const sameEmails = store.getState().harvesters.filter(b => b.accountEmail.includes(email));
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

  public static setupHarvester = (data: HarvesterData) => {
    ipc.send(SETUP_HARVESTER, data);
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

  public static startTasks = (
    tasks: Task[],
    proxies: Proxy[],
    harvesters: HarvesterData[],
    scheduler: RunnerState,
    webhook: WebhookConfig,
  ) => {
    ipc.send(START_TASKS, tasks, proxies, harvesters, scheduler, webhook);
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

  public static testWebhook = (config: WebhookConfig) => {
    ipc.send(TEST_WEBHOOK, config);
  };
}
