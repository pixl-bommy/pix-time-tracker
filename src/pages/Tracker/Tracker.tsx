import React, { useEffect } from "react";

import IconInterrupt from "@material-ui/icons/FlashOn";
import IconPause from "@material-ui/icons/Pause";
import IconStop from "@material-ui/icons/Stop";

import ButtonAddAction from "./components/ButtonAddAction";
import ButtonTimeTracker from "./components/ButtonTimeTracker";

import "./Tracker.scss";
import PageOverlay from "../PageOverlay";
import tasks from "@/services/tasks";

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
         tasks.storeTimeEntry(selectedAction);
      }
   }, [selectedAction]);

   return (
      <PageOverlay className="Tracker" title="Tracker" goBack={goToMenu}>
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
                     tasks.storeActionsFile(nextActions);
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
      </PageOverlay>
   );
}
