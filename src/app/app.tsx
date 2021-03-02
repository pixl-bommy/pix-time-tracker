import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

import IconStop from "@material-ui/icons/Stop";

import TimeTracker from "@/components/TimeTracker";

import "./app.scss";
import ActionAdder from "@/components/ActionAdder";
import OverlayAddAction from "@/components/OverlayAddAction";

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [selected, select] = React.useState("");
   const [showAdder, setShowAdder] = React.useState(false);
   const [actions, setActions] = React.useState(new Map<string, string>());

   useEffect(() => {
      process.stdout.write(JSON.stringify(initialActions) + "\n");
      setActions(initialActions);
   }, [initialActions]);

   useEffect(() => {
      if (selected === "pause" || selected === "end" || actions.get(selected)) {
         ipcRenderer.sendSync("select-action", selected);
      }
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
            <ActionAdder
               onClick={() => setShowAdder(true)}
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
         <div className="bottom button-list">
            <TimeTracker
               label={<IconStop style={{ transform: "scale(2)" }} />}
               action="end"
               small
               selected={selected || "end"}
               onClick={(next) => selected !== "" && select(next)}
            />
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

                  const payload: { [key: string]: string } = {};
                  nextActions.forEach((value, key) => {
                     payload[key] = value;
                  });
                  ipcRenderer.sendSync("actions-store", payload);
               }

               setShowAdder(false);
               select(indicator);
            }}
         />
      </div>
   );
}

export default App;
