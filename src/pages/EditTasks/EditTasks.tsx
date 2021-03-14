import React, { useState } from "react";

import "./EditTasks.scss";
import PageOverlay from "../PageOverlay";

export default function EditTasks({
   actions,
   onStoreActions,
   goToMenu,
}: {
   actions: Map<string, string>;
   onStoreActions: (tasks: Map<string, string>) => void;
   goToMenu: () => void;
}): JSX.Element {
   const [edittedTasks, setTasks] = useState<Map<string, string>>(new Map(actions));

   return (
      <PageOverlay
         className="EditTasks"
         title="EditTasks"
         goBack={() => {
            onStoreActions(edittedTasks);
            goToMenu();
         }}
      >
         <div className="top button-list">
            {Array.from(edittedTasks).map(([key, value]) => (
               <input
                  type="text"
                  key={key}
                  value={value}
                  onChange={(event) => {
                     const nextTasks = new Map(edittedTasks);
                     nextTasks.set(key, event.target.value);
                     setTasks(nextTasks);
                  }}
               />
            ))}
         </div>
         <div style={{ flexGrow: 1 }}></div>
      </PageOverlay>
   );
}
