import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

import TimeTracker from "@/components/TimeTracker";

import "./app.scss";

const actions = [
   { label: "Programmieren", action: "programming" },
   { label: "Support", action: "support" },
   { label: "Meeting", action: "meeting" },
   { label: "Planung", action: "planning" },
   { label: "Unterbrechung", action: "interrupts" },
   { label: "Verwaltung", action: "management" },
];

function App(): JSX.Element {
   const [selected, select] = React.useState(actions[0].action);

   useEffect(() => {
      ipcRenderer.sendSync("select-action", selected);
   }, [selected]);

   return (
      <div className="app">
         <div className="top button-list">
            {actions.map((action) => (
               <TimeTracker
                  key={action.action}
                  label={action.label}
                  action={action.action}
                  selected={selected}
                  onClick={select}
               />
            ))}
         </div>
         <div className="bottom button-list">
            <TimeTracker label="Pause" action="pause" selected={selected} onClick={select} />
         </div>
      </div>
   );
}

export default App;
