import React, { ReactNode } from "react";

import "./GenericButton.scss";

export interface GenericButtonProps {
   children?: ReactNode;
   selected?: boolean;
   size?: "quater" | "half" | "full";
   onClick?: () => void;
}

function GenericButton({ children, selected, size, onClick }: GenericButtonProps): JSX.Element {
   const cssClasses = ["GenericButton", selected && "selected", size || "full"]
      .filter((x) => x)
      .join(" ");

   return (
      <button className={cssClasses} onClick={onClick}>
         {children}
      </button>
   );
}

export default GenericButton;
