import electron, {
  app,
  BrowserWindow,
  Menu,
  BrowserWindowConstructorOptions,
  powerSaveBlocker,
} from 'electron';

import { dialog } from 'electron';
import path from 'path';
import { IPCMain } from './IPC/IPCMain';
import { menu } from './menu';
import { DiscordManager } from './DiscordManager';
import { config } from '../config';
import { HarvestersManager } from './bot/harvesters/HarvestersManager';

export const isDev = process.env.NODE_ENV === 'development';

let mainWindow: electron.BrowserWindow | null = null;

const installExtensions = async () => {
  const { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
  const installer = require('electron-devtools-installer');
  const extensions = [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(name, forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

const createWindow = () => {
  if (isDev) {
    installExtensions();
  }

  if (config.tasksDebug) {
    process.env.SHOW_BROWSER = 'true';
    process.env.SA_DISABLE_DEVTOOLS = 'true';
  }

  const launchOptions: BrowserWindowConstructorOptions = {
    width: 1200,
    height: 750,
    frame: false,
    show: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: isDev ? undefined : path.join(__dirname, 'preload.js'),
      backgroundThrottling: false,
    },
  };

  mainWindow = new BrowserWindow(launchOptions);
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(url);

  mainWindow.once('ready-to-show', () => {
    DiscordManager.setDiscordActivity();
    mainWindow?.show();
  });

  mainWindow.webContents.once('did-finish-load', () => {
    if (!mainWindow || !isDev) return;

    mainWindow.webContents.openDevTools();

    // * Create context menu to inspect element on right click
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            (mainWindow as any).inspectElement(props.x, props.y);
          },
        },
      ]).popup(mainWindow as any);
    });
  });

  mainWindow.on('closed', () => (mainWindow = null));
};

const dispose = async () => {
  await HarvestersManager.closeAll();
};

app.whenReady().then(createWindow);

if (!isDev) Menu.setApplicationMenu(menu);
powerSaveBlocker.start('prevent-display-sleep');

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault();
});

app.on('before-quit', dispose);
process.on('SIGINT', dispose);
process.on('SIGTERM', dispose);

process.on('uncaughtException', function(err) {
  dialog.showErrorBox(err.message.toString(), err.stack?.toString() ?? '');
});

IPCMain.registerListeners();
if (!isDev) IPCMain.setupUpdater();

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.exit(0);
}

export { mainWindow };
