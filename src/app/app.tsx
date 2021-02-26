import TimeTracker from "@/components/TimeTracker";
import React from "react";
import "./app.scss";

function App(): JSX.Element {
   const [selected, select] = React.useState(0);

   return (
      <div className="app">
         <TimeTracker selected={selected === 0} onClick={() => select(0)} />
         <TimeTracker selected={selected === 1} onClick={() => select(1)} />
         <TimeTracker selected={selected === 2} onClick={() => select(2)} />
         <TimeTracker selected={selected === 3} onClick={() => select(3)} />
         <TimeTracker selected={selected === 4} onClick={() => select(4)} />
      </div>
   );
}

export default App;
