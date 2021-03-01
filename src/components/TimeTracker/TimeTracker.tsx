import React from "react";
import "./TimeTracker.scss";

interface TimeTrackerProps {
   label: string | React.ReactNode;
   action: string;
   selected?: string;
   small?: boolean;
   onClick?: (action: string) => void;
}

function TimeTracker({ action, label, selected, small, onClick }: TimeTrackerProps): JSX.Element {
   const isSelected = selected && selected === action;

   return (
      <button
         className={`TimeTracker ${isSelected && "selected"} ${small && "small"}`}
         onClick={() => onClick(action)}
      >
         {label}
      </button>
   );
}

export default TimeTracker;
