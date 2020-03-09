import { IpcMainEvent, app } from 'electron';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import { mainWindow } from './main';
import { config } from '../config';

const downloadChromium = (e: IpcMainEvent) => {
  const chromiumPath = path.resolve(app.getPath('userData'), '.local-chromium');
  const fetcher = puppeteer.createBrowserFetcher({ path: chromiumPath });

  let prevPercentage = 0;

  fetcher.download(config.chromiumVersion, async (downloadedBytes: number, totalBytes: number) => {
    const status = {
      progress: Math.round((downloadedBytes / totalBytes) * 100),
      done: downloadedBytes === totalBytes,
    };

    if (status.progress > prevPercentage || status.done) {
      prevPercentage = status.progress;
      mainWindow?.webContents.send('CHROMIUM_DOWNLOAD_PROGRESS', status);
    }
  });
};
export { downloadChromium };
