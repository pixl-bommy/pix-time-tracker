import React from "react";
import ReactDOM from "react-dom";

import { ipcRenderer } from "electron";

import App from "@/app/app";

ipcRenderer.send("actions-load");

ipcRenderer.on("actions-loaded", (event, data) => {
   const actionList: Map<string, string> = data;

   ReactDOM.render(<App initialActions={actionList} />, document.getElementById("root"));
});
