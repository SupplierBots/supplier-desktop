import { ipcMain as ipc } from 'electron-better-ipc';
import { verifyChromium } from '../chromium/verifyChromium';
import { downloadChromium } from '../chromium/downloadChromium';
import { mainWindow } from '../main';
import BrowsersManager from '../bot/core/BrowsersManager';
import { autoUpdater, UpdateInfo } from 'electron-updater';

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
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
  UPDATE_DOWNLOAD_ERROR,
  DOWNLOAD_UPDATE,
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
    ipc.on(DOWNLOAD_UPDATE, () => {
      autoUpdater.downloadUpdate();
    });
  };

  public static setupUpdater = async () => {
    autoUpdater.autoDownload = false;

    autoUpdater.on('update-available', (info: UpdateInfo) => {
      mainWindow?.webContents.send(UPDATE_AVAILABLE, info);
    });

    autoUpdater.on('error', error => {
      mainWindow?.webContents.send(UPDATE_DOWNLOAD_ERROR, error);
    });

    autoUpdater.signals.progress(info => {
      mainWindow?.webContents.send(UPDATE_DOWNLOAD_PROGRESS, info);
    });

    autoUpdater.signals.updateDownloaded(info => {
      mainWindow?.webContents.send(UPDATE_DOWNLOADED, info);
      autoUpdater.quitAndInstall();
    });

    const res = await autoUpdater.checkForUpdates();
    console.log(res);
    setInterval(() => autoUpdater.checkForUpdates(), 1000 * 60 * 2);
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
