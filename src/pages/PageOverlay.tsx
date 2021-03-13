import React, { useRef } from "react";
import IconBack from "@material-ui/icons/ChevronLeft";

import "./PageOverlay.scss";

const SLIDEOUT_DELAY = 0.2;

export default function PageOverlay({
   children,
   className,
   goBack,
}: {
   children?: React.ReactNode | React.ReactNodeArray;
   className?: string;
   goBack: () => void;
}): JSX.Element {
   const containerRef = useRef<HTMLDivElement>(null);
   const pageOverlayClassName = ["PageOverlay", className].filter((x) => x).join(" ");

   return (
      <div className={pageOverlayClassName} ref={containerRef}>
         <div>
            <button
               className="text-button"
               onClick={() => {
                  containerRef.current.classList.add("slide-out");
                  setTimeout(goBack, SLIDEOUT_DELAY * 1000);
               }}
            >
               <IconBack />
            </button>
         </div>
         {children}
      </div>
   );
}
