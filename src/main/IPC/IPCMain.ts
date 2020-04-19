import { ipcMain as ipc } from 'electron-better-ipc';
import { verifyChromium } from '../chromium/verifyChromium';
import { downloadChromium } from '../chromium/downloadChromium';
import { mainWindow } from '../main';
import { autoUpdater, UpdateInfo } from 'electron-updater';

import {
  WINDOW_CLOSE,
  WINDOW_MINIMIZE,
  SETUP_HARVESTER,
  DOWNLOAD_CHROMIUM,
  VERIFY_CHROME,
  START_TASKS,
  STOP_TASKS,
  GET_PROFILE,
  UPDATE_TASK_STATUS,
  HARVESTER_STATE_CHANGE,
  SET_HARVESTER_EMAIL,
  GET_SAME_EMAILS,
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
} from './IPCEvents';
import { Profile } from '../types/Profile';
import { TaskStatus } from '../types/TaskStatus';
import { HarvesterData } from '../types/HarvesterData';
import { Product } from '../types/Product';
import { app } from 'electron';
import { CheckoutData } from '../types/Checkout';
import { Proxy } from '../types/Proxy';
import { TasksManager } from '../bot/core/TasksManager';
import { HarvestersManager } from '../bot/harvesters/HarvestersManager';

export abstract class IPCMain {
  private constructor() {}
  public static registerListeners = () => {
    ipc.answerRenderer(VERIFY_CHROME, verifyChromium);
    ipc.on(DOWNLOAD_CHROMIUM, downloadChromium);
    ipc.on(SETUP_HARVESTER, (e, data: HarvesterData) => HarvestersManager.setupHarvester(data));
    ipc.on(START_TASKS, (e, tasks, proxies, harvesters, runner) =>
      TasksManager.start(tasks, proxies, harvesters, runner),
    );
    ipc.on(STOP_TASKS, e => TasksManager.stopAllHybirdTasks());
    ipc.on(WINDOW_MINIMIZE, () => mainWindow?.minimize());
    ipc.on(WINDOW_CLOSE, () => mainWindow?.close());
    ipc.on(DOWNLOAD_UPDATE, () => {
      autoUpdater.downloadUpdate();
    });

    ipc.on(RELAUNCH, () => {
      app.relaunch();
      app.exit();
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

    await autoUpdater.checkForUpdates();
    setInterval(() => autoUpdater.checkForUpdates(), 1000 * 60 * 5);
  };

  public static getProfile = async (id: string) => {
    if (!mainWindow) return;
    const profile = await ipc.callRenderer<string, Profile>(mainWindow, GET_PROFILE, id);
    return profile;
  };

  public static getProxy = async (id: string) => {
    if (!mainWindow) return;
    const proxy = await ipc.callRenderer<string, Proxy>(mainWindow, GET_PROXY, id);
    return proxy;
  };

  public static getProduct = async (id: string) => {
    if (!mainWindow) return;
    const product = await ipc.callRenderer<string, Product>(mainWindow, GET_PRODUCT, id);
    return product;
  };

  public static updateTaskStatus = (id: string, status: TaskStatus) => {
    if (!mainWindow) return;
    mainWindow.webContents.send(UPDATE_TASK_STATUS, { id, status });
  };

  public static getSameEmails = async (email: string) => {
    if (!mainWindow) return;
    const emails = await ipc.callRenderer<string, HarvesterData[]>(
      mainWindow,
      GET_SAME_EMAILS,
      email,
    );
    return emails;
  };

  public static harvesterStateChange = (id: string, status: boolean) => {
    mainWindow?.webContents.send(HARVESTER_STATE_CHANGE, { id, status });
  };

  public static setHarvesterEmail = (id: string, email: string) => {
    mainWindow?.webContents.send(SET_HARVESTER_EMAIL, { id, email });
  };

  public static reportCheckout = (checkoutData: CheckoutData) => {
    mainWindow?.webContents.send(REPORT_CHECKOUT, checkoutData);
  };

  public static resetTimerState = () => {
    mainWindow?.webContents.send(RESET_TIMER_STATE);
  };

  public static setTaskActivity = (id: string, isActive: boolean) => {
    mainWindow?.webContents.send(SET_TASK_ACTIVITY, { id, isActive });
  };
}
