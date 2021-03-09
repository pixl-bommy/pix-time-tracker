import React, { useState } from "react";

import "./app.scss";
import PageTracker from "./tracker";

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [selectedAction, selectAction] = useState("end");

   const [overlay, setOverlay] = useState("");

   return (
      <>
         <div className="app">
            <h1>pixl Time Tracker</h1>
            <div className="menu">
               <button onClick={() => setOverlay("tracker")}>Tracker Today</button>
            </div>
            <div style={{ flexGrow: 1 }}></div>
         </div>

         <div className={`${overlay === "tracker" && "slide-in"} fullscreen-overlay`}>
            <PageTracker
               initialActions={initialActions}
               selectedAction={selectedAction}
               onSelect={selectAction}
               goToMenu={() => setOverlay("")}
            />
         </div>
      </>
   );
}

export default App;
