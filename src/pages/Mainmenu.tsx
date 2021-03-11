import React from "react";

import Button from "../components/GenericButton";

import "./Mainmenu.scss";

function Mainmenu({ setOverlay }: { setOverlay: (overlay: string) => void }): JSX.Element {
   return (
      <>
         <h1>pixl Time Tracker</h1>
         <div className="Mainmenu">
            <Button textcolor="#000" onClick={() => setOverlay("tracker")}>
               Tracker Today
            </Button>
         </div>
         <div style={{ flexGrow: 1 }}></div>
      </>
   );
}

export default Mainmenu;
