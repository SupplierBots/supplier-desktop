import { IPCMain } from '../../IPC/IPCMain';
import _ from 'lodash';
import { BrowserWindow } from 'electron';
import { ipcMain } from 'electron-better-ipc';

const setupHarvester = async (browser: BrowserWindow, id: string) => {
  IPCMain.setHarvesterEmail(id, `Not-Logged-${_.takeRight(id, 5).join('')}`);
  await browser.webContents.session.clearStorageData({ storages: ['cookies'] });

  browser.loadURL(
    'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en',
  );
  browser.webContents.on('did-finish-load', async () => {
    if (!browser.webContents.getURL().includes('myaccount')) return;

    let email = await ipcMain.callRenderer<null, string>(browser, 'get-email');

    const sameEmails = await IPCMain.getSameEmails(email);

    if (sameEmails && sameEmails.length > 0) {
      email += ` (${sameEmails.length + 1})`;
    }
    IPCMain.setHarvesterEmail(id, email);
    browser.close();
  });
};
export { setupHarvester };
