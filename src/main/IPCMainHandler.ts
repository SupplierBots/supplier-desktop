import { ipcMain } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import { verifyChromium } from './verifyChromium';
import { downloadChromium } from './downloadChromium';
import { setupBrowser } from './setupBrowser';
import { mainWindow } from './main';

const setupListeners = () => {
  ipc.answerRenderer('VERIFY_CHROME', verifyChromium);
  ipcMain.on('DOWNLOAD_CHROMIUM', downloadChromium);
  ipcMain.on('SETUP_BROWSER', setupBrowser);
  ipcMain.on('WINDOW_MINIMIZE', () => mainWindow?.minimize());
  ipcMain.on('WINDOW_CLOSE', () => mainWindow?.close());
};

export { setupListeners };
