import React from "react";

import Button from "@/components/GenericButton";

interface ButtonTimeTrackerProps {
   label: string | React.ReactNode;
   action: string;
   selected?: string;
   small?: boolean;
   onClick?: (action: string) => void;
}

function ButtonTimeTracker({
   action,
   label,
   selected,
   small,
   onClick,
}: ButtonTimeTrackerProps): JSX.Element {
   const isSelected = selected && selected === action;
   const currentSize = small ? "quater" : undefined;

   return (
      <Button selected={isSelected} size={currentSize} onClick={() => onClick(action)}>
         {label}
      </Button>
   );
}

export default ButtonTimeTracker;
