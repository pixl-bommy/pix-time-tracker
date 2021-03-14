import { ipcRenderer } from "electron";

export default {
   storeTimeEntry: (selectedTask: string): void => {
      const entry = {
         task: selectedTask,
         time: Date.now(),
      };

      ipcRenderer.sendSync("select-action", entry);
   },
   storeActionsFile: (tasks: Map<string, string>): void => {
      const payload: { [key: string]: string } = {};

      tasks.forEach((value, key) => {
         payload[key] = value;
      });

      ipcRenderer.sendSync("actions-store", payload);
   },
};
