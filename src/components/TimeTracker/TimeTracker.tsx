import React from "react";
import "./TimeTracker.scss";

interface TimeTrackerProps {
   label: string;
   selected?: boolean;
   onClick?: () => void;
}

function TimeTracker(props: TimeTrackerProps): JSX.Element {
   return (
      <input
         className={`TimeTracker ${props.selected && "selected"}`}
         type="button"
         value={props.label}
         onClick={props.onClick}
      />
   );
}

export default TimeTracker;
