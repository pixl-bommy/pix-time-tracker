import React from "react";

import Button from "./GenericButton";

interface TimeTrackerProps {
   label: string | React.ReactNode;
   action: string;
   selected?: string;
   small?: boolean;
   onClick?: (action: string) => void;
}

function TimeTracker({ action, label, selected, small, onClick }: TimeTrackerProps): JSX.Element {
   const isSelected = selected && selected === action;
   const currentSize = small ? "quater" : undefined;

   return (
      <Button selected={isSelected} size={currentSize} onClick={() => onClick(action)}>
         {label}
      </Button>
   );
}

export default TimeTracker;
