import React, { useEffect, useRef } from "react";
import { ipcRenderer } from "electron";

import IconBack from "@material-ui/icons/ChevronLeft";
import IconInterrupt from "@material-ui/icons/FlashOn";
import IconPause from "@material-ui/icons/Pause";
import IconStop from "@material-ui/icons/Stop";

import ButtonAddAction from "./components/ButtonAddAction";
import ButtonTimeTracker from "./components/ButtonTimeTracker";

import "../pages-overlay.scss";
import "./Tracker.scss";
import { SLIDEOUT_DELAY } from "../pages-overlay";

const staticActions = [
   { action: "end", icon: <IconStop style={{ transform: "scale(2)" }} /> },
   { action: "pause", icon: <IconPause style={{ transform: "scale(2)" }} /> },
   { action: "interrupt", icon: <IconInterrupt style={{ transform: "scale(2)" }} /> },
];

export default function Tracker({
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
   const containerRef = useRef<HTMLDivElement>(null);
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
      <div className="Tracker fullscreen-overlay" ref={containerRef}>
         <div>
            <button
               className="text-button"
               onClick={() => {
                  containerRef.current.classList.add("slide-out");
                  setTimeout(goToMenu, SLIDEOUT_DELAY * 1000);
               }}
            >
               <IconBack />
            </button>
         </div>
         <div className="top button-list">
            {Array.from(actions).map(([key, value]) => (
               <ButtonTimeTracker
                  key={key}
                  label={value}
                  action={key}
                  selected={selectedAction}
                  onClick={onSelect}
               />
            ))}
            <ButtonAddAction
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
               <ButtonTimeTracker
                  key={action}
                  label={icon}
                  action={action}
                  selected={selectedAction}
                  onClick={onSelect}
               />
            ))}
         </div>
      </div>
   );
}
