import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

import TimeTracker from "@/components/TimeTracker";

import "./app.scss";
import ActionAdder from "@/components/ActionAdder";
import OverlayAddAction from "@/components/OverlayAddAction";

function App(): JSX.Element {
   const [selected, select] = React.useState("");
   const [showAdder, setShowAdder] = React.useState(false);
   const [actions, setActions] = React.useState(new Map<string, string>());

   useEffect(() => {
      ipcRenderer.sendSync("select-action", selected);
   }, [selected]);

   return (
      <div className="app">
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
            <ActionAdder onClick={() => setShowAdder(true)} />
         </div>
         <div className="bottom button-list">
            <TimeTracker label="Pause" action="pause" selected={selected} onClick={select} />
         </div>
         <OverlayAddAction
            open={showAdder}
            onCancel={() => setShowAdder(false)}
            onCreate={(action, indicator) => {
               if (!actions.has(indicator)) {
                  const nextActions = new Map(actions);
                  nextActions.set(indicator, action);
                  setActions(nextActions);
               }

               setShowAdder(false);
               select(indicator);
            }}
         />
      </div>
   );
}

export default App;
