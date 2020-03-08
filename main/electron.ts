import electron, {
  app,
  BrowserWindow,
  Menu,
  BrowserWindowConstructorOptions,
  ipcMain,
} from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

import { setupListeners } from './IPCMainHandler';

let mainWindow: electron.BrowserWindow | null;

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

  let launchOptions: BrowserWindowConstructorOptions = {
    width: 1200,
    height: 750,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  };

  mainWindow = new BrowserWindow(launchOptions);

  //mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  mainWindow.webContents.once('did-finish-load', () => {
    if (mainWindow) {
      mainWindow.show();

      if (isDev) {
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
      }
    }
  });
  mainWindow.on('closed', () => (mainWindow = null));

  // * IPCEventMain type to be fixed in 6.0 | Read more: https://github.com/electron/typescript-definitions/issues/27
  ipcMain.on('asynchronous-message', (event: any, message: string) => {
    event.reply('asynchronous-reply', `Received ${message}!`);
  });
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

export { mainWindow };

setupListeners();
