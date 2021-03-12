import React, { useState } from "react";

import Button from "../components/GenericButton";
import Tracker from "../pages/tracker";

import "./app.scss";

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [selectedAction, selectAction] = useState("end");

   const [overlay, setOverlay] = useState("");

   return (
      <>
         <div className="app">
            <h1>pixl Time Tracker</h1>
            <div className="Mainmenu">
               <Button color="#00f" textcolor="#fff" onClick={() => setOverlay("tracker")}>
                  Tracker Today
               </Button>
            </div>
            <div style={{ flexGrow: 1 }}></div>
         </div>

         <div className={`${overlay === "tracker" && "slide-in"} fullscreen-overlay`}>
            <Tracker
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
