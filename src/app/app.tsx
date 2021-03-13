import React, { useState } from "react";

import Button from "@/components/GenericButton";
import Tracker from "@/pages/Tracker";
import EditTasks from "@/pages/EditTasks";

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
               <Button color="#00f" textcolor="#fff" onClick={() => setOverlay("edit")}>
                  Edit Tasks
               </Button>
            </div>
            <div style={{ flexGrow: 1 }}></div>
         </div>

         {overlay === "tracker" && (
            <Tracker
               initialActions={initialActions}
               selectedAction={selectedAction}
               onSelect={selectAction}
               goToMenu={() => setOverlay("")}
            />
         )}
         {overlay === "edit" && <EditTasks goToMenu={() => setOverlay("")} />}
      </>
   );
}

export default App;
