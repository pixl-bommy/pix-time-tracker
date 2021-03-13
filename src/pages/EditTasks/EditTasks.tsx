import React from "react";

import "./EditTasks.scss";
import PageOverlay from "../PageOverlay";

export default function EditTasks({ goToMenu }: { goToMenu: () => void }): JSX.Element {
   return <PageOverlay className="EditTasks" title="EditTasks" goBack={goToMenu}></PageOverlay>;
}
