import React from "react";
import "./TimeTracker.scss";

const TimeTracker = (props:any):JSX.Element => {
    return(
        <input
            className={`TimeTracker ${props.selected && "selected"}`}
            type="button"
            value="Kekse"
            onClick={props.onClick}
        />
    )
}

export default TimeTracker;