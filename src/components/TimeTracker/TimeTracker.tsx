import React from "react";
import "./TimeTracker.scss";

interface TimeTrackerProps {
   label: string;
   action: string;
   selected?: string;
   onClick?: (action: string) => void;
}

function TimeTracker({ action, label, selected, onClick }: TimeTrackerProps): JSX.Element {
   const isSelected = selected && selected === action;

   return (
      <input
         className={`TimeTracker ${isSelected && "selected"}`}
         type="button"
         value={label}
         onClick={() => onClick(action)}
      />
   );
}

export default TimeTracker;
