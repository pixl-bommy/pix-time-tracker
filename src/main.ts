import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import { TrayMenu } from "./electron/TrayMenu";

const createWindow = (): BrowserWindow => {
   const win = new BrowserWindow({
      height: 640,
      width: 360,
      resizable: true,
      x: 0,
      y: 0,
      autoHideMenuBar: true,
      webPreferences: {
         nodeIntegration: true,
      },
   });

   win.loadURL(isDev ? "http://localhost:9000" : `file://${app.getAppPath()}/index.html`);

   return win;
};

const appElements: { tray: TrayMenu; windows: BrowserWindow[] } = {
   tray: null,
   windows: [],
};

app.on("ready", () => {
   // appElements.tray = new TrayMenu();
   appElements.windows.push(createWindow());
});
