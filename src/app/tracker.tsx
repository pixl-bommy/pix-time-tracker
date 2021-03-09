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

export default function PageTracker({
   initialActions,
   selectedAction,
   onSelect,
   goToMenu,
}: {
   initialActions: Map<string, string>;
   selectedAction: string;
   onSelect: (action: string) => void;
   goToMenu: () => void;
}): JSX.Element {
   const [actions, setActions] = React.useState(new Map<string, string>());

   useEffect(() => {
      process.stdout.write(JSON.stringify(initialActions) + "\n");
      setActions(initialActions);
   }, [initialActions]);

   useEffect(() => {
      if (
         actions.get(selectedAction) ||
         staticActions.find(({ action }) => action === selectedAction)
      ) {
         ipcRenderer.sendSync("select-action", selectedAction);
      }
   }, [selectedAction]);

   return (
      <>
         <div>
            <button className="text-button" onClick={goToMenu}>
               <IconBack />
            </button>
         </div>
         <div className="top button-list">
            {Array.from(actions).map(([key, value]) => (
               <TimeTracker
                  key={key}
                  label={value}
                  action={key}
                  selected={selectedAction}
                  onClick={onSelect}
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

                  onSelect(indicator);
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
                  selected={selectedAction}
                  onClick={onSelect}
               />
            ))}
         </div>
      </>
   );
}
