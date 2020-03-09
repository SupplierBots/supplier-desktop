import { IpcMainEvent } from 'electron';
import { BrowserData } from '../types/BrowserData';
import BrowsersManager from './bot/BrowsersManager';

const setupBrowser = (e: IpcMainEvent, data: BrowserData) => {
  BrowsersManager.getInstance().setup(data);
};

export { setupBrowser };
