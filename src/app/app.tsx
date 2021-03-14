import React, { useEffect, useState } from "react";

import Button from "@/components/GenericButton";
import Tracker from "@/pages/Tracker";
import EditTasks from "@/pages/EditTasks";

import "./app.scss";
import TaskService from "@/services/TaskService";

function App({ initialActions }: { initialActions: Map<string, string> }): JSX.Element {
   const [overlay, setOverlay] = useState("");
   const [selectedAction, selectAction] = useState("end");
   const [actions, setActions] = React.useState(new Map<string, string>());

   useEffect(() => {
      process.stdout.write(JSON.stringify(initialActions) + "\n");
      setActions(initialActions);
   }, [initialActions]);

   function createTask(task: string): { task: string; indicator: string } {
      const indicator = task.toLocaleLowerCase().replace(" ", "-");

      if (!actions.has(indicator)) {
         const nextActions = new Map(actions);
         nextActions.set(indicator, task);

         setActions(nextActions);
         TaskService.storeActionsFile(nextActions);

         return { task, indicator };
      }
   }

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
               actions={actions}
               selectedAction={selectedAction}
               onCreate={(action) => {
                  const created = createTask(action);
                  if (created) selectAction(created.indicator);
               }}
               onSelect={selectAction}
               goToMenu={() => setOverlay("")}
            />
         )}
         {overlay === "edit" && (
            <EditTasks
               actions={actions}
               onStoreActions={(tasks) => {
                  setActions(tasks);
                  TaskService.storeActionsFile(tasks);
               }}
               goToMenu={() => setOverlay("")}
            />
         )}
      </>
   );
}

export default App;
