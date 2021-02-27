import { app, ipcMain, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

import nodeFs from "fs";
import nodePath from "path";

import { TrayMenu } from "./electron/TrayMenu";

const createWindow = (config: { bounds?: Electron.Rectangle } = {}): BrowserWindow => {
   const win = new BrowserWindow({
      height: config?.bounds?.height || 640,
      width: config?.bounds?.width || 360,
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

const configFile = nodePath.resolve(__dirname, "app.cfg");

async function writeConfig(config: { bounds: Electron.Rectangle }): Promise<void> {
   return new Promise((resolve, reject) => {
      nodeFs.writeFile(configFile, JSON.stringify(config), (error) => {
         if (error) reject(error);
         return resolve();
      });
   });
}

async function loadConfig(): Promise<{ bounds: Electron.Rectangle }> {
   return new Promise((resolve, reject) => {
      nodeFs.readFile(configFile, "", (error, data) => {
         if (error) reject(error);
         return resolve(JSON.parse(data || "{}"));
      });
   });
}

const appElements: { tray: TrayMenu; window: BrowserWindow } = {
   tray: null,
   window: null,
};

app.on("ready", async () => {
   let config;

   try {
      config = await loadConfig();
   } catch (_) {
      config = null;
   }

   appElements.window = createWindow(config);
   appElements.window.on("close", () => {
      const config = { bounds: appElements.window.getBounds() };
      writeConfig(config);
   });
});

ipcMain.on("select-action", (event, action: string) => {
   const logEntry = JSON.stringify({ timestamp: Date.now(), action });
   console.log(logEntry);
   event.returnValue = "";
});
