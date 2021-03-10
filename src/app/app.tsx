import Mainmenu from "@/pages/Mainmenu";
import React, { useState } from "react";

import Tracker from "../pages/tracker";

import "./app.scss";

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [selectedAction, selectAction] = useState("end");

   const [overlay, setOverlay] = useState("");

   return (
      <>
         <div className="app">
            <Mainmenu setOverlay={setOverlay} />
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
