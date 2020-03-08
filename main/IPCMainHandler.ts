import { ipcMain } from 'electron';
import { verifyChromium } from './verifyChromium';
import { downloadChromium } from './downloadChromium';
import { setupBrowser } from './setupBrowser';

const setupListeners = () => {
  ipcMain.handle('VERIFY_CHROME', verifyChromium);
  ipcMain.on('DOWNLOAD_CHROMIUM', downloadChromium);
  ipcMain.on('SETUP_BROWSER', setupBrowser);
};

export { setupListeners };
