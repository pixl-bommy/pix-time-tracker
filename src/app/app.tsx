import React, { useEffect } from "react";

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
      const logEntry = JSON.stringify({ timestamp: Date.now(), selected });
      console.log(logEntry);
      process.stdout.write(logEntry + "\n");
   }, [selected]);

   return (
      <div className="app">
         <div className="top button-list">
            {actions.map((action) => (
               <TimeTracker
                  key={action.action}
                  label={action.label}
                  selected={selected === action.action}
                  onClick={() => select(action.action)}
               />
            ))}
         </div>
         <div className="bottom button-list">
            <TimeTracker
               label="Pause"
               selected={selected === "pause"}
               onClick={() => select("pause")}
            />
         </div>
      </div>
   );
}

export default App;
