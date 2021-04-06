import { WebhookConfig } from './../types/WebhookConfig';
import { ipcMain as ipc } from 'electron-better-ipc';
import { mainWindow } from '../main';
import { autoUpdater, UpdateInfo } from 'electron-updater';
import { EngineFetcher } from '@secret-agent/puppet/lib/EngineFetcher';
import { validateHostRequirements } from '@secret-agent/puppet/lib/validateHostDependencies';

import * as chrome from 'chrome-launcher';

import {
  WINDOW_CLOSE,
  WINDOW_MINIMIZE,
  SETUP_HARVESTER,
  CHECK_CHROME,
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
  TEST_WEBHOOK,
  CHECK_BROWSER_ENGINE,
  ChromeVerifiedPayload,
  DOWNLOAD_BROWSER_ENGINE,
  BROWSER_ENGINE_DOWNLOAD_PROGRESS,
  TASKS_STARTED,
  TASKS_STOPPED,
} from './IPCEvents';
import { Profile } from '../types/Profile';
import { TaskStatus } from '../types/TaskStatus';
import { HarvesterData } from '../types/HarvesterData';
import { app } from 'electron';
import { CheckoutData } from '../types/Checkout';
import { Proxy } from '../types/Proxy';
import { TasksManager } from '../bot/TasksManager';
import { HarvestersManager } from '../bot/harvesters/HarvestersManager';
import { DiscordManager } from '../DiscordManager';
import { config } from '../../config';
import { PredefinedProduct } from '../types/PredefinedProduct';
import { TasksManagerPayload } from 'main/types/TasksManagerPayload';

export abstract class IPCMain {
  private constructor() {}
  public static registerListeners = () => {
    ipc.answerRenderer(CHECK_CHROME, IPCMain.checkChrome);
    ipc.answerRenderer(CHECK_BROWSER_ENGINE, IPCMain.checkBrowserEngine);
    ipc.on(START_TASKS, (e, payload: TasksManagerPayload) => TasksManager.start(payload));
    ipc.on(DOWNLOAD_BROWSER_ENGINE, () => IPCMain.downloadBrowserEngine());
    ipc.on(SETUP_HARVESTER, (e, data: HarvesterData) => HarvestersManager.setupHarvester(data));
    ipc.on(STOP_TASKS, e => TasksManager.stopAllTasks());
    ipc.on(WINDOW_MINIMIZE, () => mainWindow?.minimize());
    ipc.on(WINDOW_CLOSE, () => mainWindow?.close());
    ipc.on(DOWNLOAD_UPDATE, () => {
      autoUpdater.downloadUpdate();
    });

    ipc.on(TEST_WEBHOOK, (e, config: WebhookConfig) => DiscordManager.sendTestWebhook(config));

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
    const product = await ipc.callRenderer<string, PredefinedProduct>(mainWindow, GET_PRODUCT, id);
    return product;
  };

  private static checkChrome = (): ChromeVerifiedPayload => {
    var path = chrome.Launcher.getFirstInstallation();
    return {
      success: !!path,
      executablePath: path ?? 'not-installed',
      version: app.getVersion(),
    };
  };

  private static getEngineFetcher = () => {
    const { fullVersion, name, executablePathEnvVar } = config.browserEngine;
    return new EngineFetcher(name, fullVersion, executablePathEnvVar);
  };

  private static checkBrowserEngine = () => IPCMain.getEngineFetcher().isInstalled;

  private static downloadBrowserEngine = () => {
    const engineFetcher = IPCMain.getEngineFetcher();
    let prevPercentage = 0;
    engineFetcher.download(async (downloadedBytes: number, totalBytes: number) => {
      const status = {
        progress: Math.round((downloadedBytes / totalBytes) * 100),
        done: downloadedBytes === totalBytes,
      };

      if (status.progress > prevPercentage || status.done) {
        prevPercentage = status.progress;
        if (status.done) {
          await validateHostRequirements(engineFetcher.toJSON());
        }
        mainWindow?.webContents.send(BROWSER_ENGINE_DOWNLOAD_PROGRESS, status);
      }
    });
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

  public static notifyTasksStarted = () => {
    mainWindow?.webContents.send(TASKS_STARTED);
  };

  public static notifyTasksStopped = () => {
    mainWindow?.webContents.send(TASKS_STOPPED);
  };
}
