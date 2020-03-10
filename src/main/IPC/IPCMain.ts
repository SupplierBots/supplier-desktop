import { ipcMain as ipc } from 'electron-better-ipc';
import { verifyChromium } from '../chromium/verifyChromium';
import { downloadChromium } from '../chromium/downloadChromium';
import { mainWindow } from '../main';
import BrowsersManager from '../bot/BrowsersManager';
import {
  WINDOW_CLOSE,
  WINDOW_MINIMIZE,
  SETUP_BROWSER,
  DOWNLOAD_CHROMIUM,
  VERIFY_CHROME,
} from './IPCEvents';

export abstract class IPCMain {
  private constructor() {}
  public static registerListeners = () => {
    ipc.answerRenderer(VERIFY_CHROME, verifyChromium);
    ipc.on(DOWNLOAD_CHROMIUM, downloadChromium);
    ipc.on(SETUP_BROWSER, (e, data) => BrowsersManager.getInstance().setup(data));
    ipc.on(WINDOW_MINIMIZE, () => mainWindow?.minimize());
    ipc.on(WINDOW_CLOSE, () => mainWindow?.close());
  };
}
