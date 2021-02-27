import React from "react";
import "./ActionAdder.scss";

interface ActionAdderProps {
   onClick: () => void;
}

function ActionAdder({ onClick }: ActionAdderProps): JSX.Element {
   return <input className={`ActionAdder`} type="button" value="+" onClick={onClick} />;
}

export default ActionAdder;
