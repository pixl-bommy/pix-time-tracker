import React, { ReactNode } from "react";

import "./GenericButton.scss";

export interface GenericButtonProps {
   children?: ReactNode;
   color?: string;
   selected?: boolean;
   size?: "quater" | "half" | "full";
   textcolor?: string;
   onClick?: () => void;
}

function GenericButton({
   children,
   color = "#fff",
   selected,
   size,
   textcolor = "#00f",
   onClick,
}: GenericButtonProps): JSX.Element {
   const cssClasses = ["GenericButton", selected && "selected", size || "full"]
      .filter((x) => x)
      .join(" ");

   const backgroundColor = selected ? textcolor : color;
   const foregroundColor = selected ? color : textcolor;

   return (
      <button
         className={cssClasses}
         onClick={onClick}
         style={{
            backgroundColor: backgroundColor,
            borderColor: foregroundColor,
            color: foregroundColor,
         }}
      >
         {children}
      </button>
   );
}

export default GenericButton;
