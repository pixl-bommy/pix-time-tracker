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

const configFile = nodePath.resolve(__dirname, "app.config");
const actionsFile = nodePath.resolve(__dirname, "actions.config");
const timestampsFile = nodePath.resolve(__dirname, "timestamps.csv");

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
   const logEntry = Date.now() + "," + action + "\n";
   nodeFs.appendFile(timestampsFile, logEntry, "utf8", (err) => console.log(logEntry, err));
   event.returnValue = "";
});

ipcMain.on("actions-store", (event, actions) => {
   nodeFs.writeFile(actionsFile, JSON.stringify(actions), { encoding: "utf8" }, (error) => {
      if (error) event.returnValue = error;
      else event.returnValue = null;
   });
});

ipcMain.on("actions-load", (event) => {
   nodeFs.readFile(actionsFile, "utf8", (error, data: string) => {
      const response: Map<string, string> = new Map<string, string>();

      if (error) {
         console.log("ERROR:", error);
      } else {
         console.log("NOERROR:", data);

         const json: { [key: string]: string } = JSON.parse(data || "{}");
         Object.entries(json).forEach(([key, value]) => {
            response.set(key, value);
         });
      }

      event.reply("actions-loaded", response);
   });
});
