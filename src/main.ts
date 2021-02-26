import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

const createWindow = (): void => {
  const win = new BrowserWindow({
    height: 640,
    width: 360,
    resizable: false,
    x:0,
    y:0,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${app.getAppPath()}/index.html`,
  );
}

app.on('ready', createWindow);
