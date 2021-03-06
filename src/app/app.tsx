import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

import IconBack from "@material-ui/icons/ChevronLeft";
import IconInterrupt from "@material-ui/icons/FlashOn";
import IconPause from "@material-ui/icons/Pause";
import IconStop from "@material-ui/icons/Stop";

import TimeTracker from "@/components/TimeTracker";

import "./app.scss";
import ActionAdder from "@/components/ActionAdder";

const staticActions = [
   { action: "end", icon: <IconStop style={{ transform: "scale(2)" }} /> },
   { action: "pause", icon: <IconPause style={{ transform: "scale(2)" }} /> },
   { action: "interrupt", icon: <IconInterrupt style={{ transform: "scale(2)" }} /> },
];

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [selected, select] = React.useState("end");
   const [actions, setActions] = React.useState(new Map<string, string>());

   useEffect(() => {
      process.stdout.write(JSON.stringify(initialActions) + "\n");
      setActions(initialActions);
   }, [initialActions]);

   useEffect(() => {
      if (actions.get(selected) || staticActions.find(({ action }) => action === selected)) {
         ipcRenderer.sendSync("select-action", selected);
      }
   }, [selected]);

   return (
      <div className="app">
         <div>
            <button className="text-button">
               <IconBack />
            </button>
         </div>
         <div className="top button-list">
            {Array.from(actions).map(([key, value]) => (
               <TimeTracker
                  key={key}
                  label={value}
                  action={key}
                  selected={selected}
                  onClick={select}
               />
            ))}
            <ActionAdder
               onCreate={(action) => {
                  const indicator = action.toLocaleLowerCase().replace(" ", "-");

                  if (!actions.has(indicator)) {
                     const nextActions = new Map(actions);
                     nextActions.set(indicator, action);
                     setActions(nextActions);

                     const payload: { [key: string]: string } = {};
                     nextActions.forEach((value, key) => {
                        payload[key] = value;
                     });
                     ipcRenderer.sendSync("actions-store", payload);
                  }

                  select(indicator);
               }}
            />
         </div>
         <div style={{ flexGrow: 1 }}></div>
         <div className="bottom button-list">
            {staticActions.map(({ action, icon }) => (
               <TimeTracker
                  key={action}
                  label={icon}
                  action={action}
                  selected={selected}
                  onClick={select}
                  small
               />
            ))}
         </div>
      </div>
   );
}

export default App;
