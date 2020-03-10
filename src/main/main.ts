import electron, { app, BrowserWindow, Menu, BrowserWindowConstructorOptions } from 'electron';

import path from 'path';
import { IPCMain } from './IPC/IPCMain';

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: electron.BrowserWindow | null = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

const createWindow = () => {
  if (isDev) {
    installExtensions();
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
      backgroundThrottling: false,
    },
  };

  mainWindow = new BrowserWindow(launchOptions);

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(url);

  mainWindow.webContents.once('did-finish-load', () => {
    if (!mainWindow) return;
    mainWindow.show();

    if (!isDev) return;
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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

IPCMain.registerListeners();

export { mainWindow };
