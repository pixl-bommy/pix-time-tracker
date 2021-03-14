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
   actions,
   selectedAction,
   onCreate,
   onSelect,
   goToMenu,
}: {
   actions: Map<string, string>;
   selectedAction: string;
   onCreate: (action: string) => void;
   onSelect: (action: string) => void;
   goToMenu: () => void;
}): JSX.Element {
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
            <ButtonAddAction onCreate={(action) => onCreate(action)} />
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
