import { ipcMain as ipc } from 'electron-better-ipc';
import { verifyChromium } from '../chromium/verifyChromium';
import { downloadChromium } from '../chromium/downloadChromium';
import { mainWindow } from '../main';
import BrowsersManager from '../bot/core/BrowsersManager';

import {
  WINDOW_CLOSE,
  WINDOW_MINIMIZE,
  SETUP_BROWSER,
  DOWNLOAD_CHROMIUM,
  VERIFY_CHROME,
  START_TASKS,
  STOP_TASKS,
  GET_PROFILE,
  UPDATE_TASK_STATUS,
  BROWSER_STATE_CHANGE,
  SET_BROWSER_EMAIL,
  GET_SAME_EMAILS,
  GET_PRODUCT,
} from './IPCEvents';
import { Profile } from '../types/Profile';
import { TaskStatus } from '../types/TaskStatus';
import { Task } from '../types/Task';
import { BrowserData } from '../types/BrowserData';
import { Product } from '../types/Product';

export abstract class IPCMain {
  private constructor() {}
  public static registerListeners = () => {
    ipc.answerRenderer(VERIFY_CHROME, verifyChromium);
    ipc.on(DOWNLOAD_CHROMIUM, downloadChromium);
    ipc.on(SETUP_BROWSER, (e, data) => BrowsersManager.getInstance().setup(data));
    ipc.on(START_TASKS, (e, tasks) => BrowsersManager.getInstance().startTasks(tasks));
    ipc.on(STOP_TASKS, e => BrowsersManager.getInstance().stopAll());
    ipc.on(WINDOW_MINIMIZE, () => mainWindow?.minimize());
    ipc.on(WINDOW_CLOSE, () => mainWindow?.close());
  };

  public static getProfile = async (id: string) => {
    if (!mainWindow) return;
    const profile = await ipc.callRenderer<string, Profile>(mainWindow, GET_PROFILE, id);
    return profile;
  };

  public static getProduct = async (id: string) => {
    if (!mainWindow) return;
    const product = await ipc.callRenderer<string, Product>(mainWindow, GET_PRODUCT, id);
    return product;
  };

  public static updateTaskStatus = (task: Task, status: TaskStatus) => {
    if (!mainWindow) return;
    const newState = { ...task, status };
    mainWindow.webContents.send(UPDATE_TASK_STATUS, newState);
  };

  public static getSameEmails = async (email: string) => {
    if (!mainWindow) return;
    const emails = await ipc.callRenderer<string, BrowserData[]>(
      mainWindow,
      GET_SAME_EMAILS,
      email,
    );
    return emails;
  };

  public static browserStateChange = (id: string, status: boolean) => {
    mainWindow?.webContents.send(BROWSER_STATE_CHANGE, { id, status });
  };

  public static setBrowserEmail = (id: string, email: string) => {
    mainWindow?.webContents.send(SET_BROWSER_EMAIL, { id, email });
  };
}
