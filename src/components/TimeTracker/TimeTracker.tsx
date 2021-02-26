import React from "react";
import "./TimeTracker.scss";

interface TimeTrackerProps {
    selected?:boolean;
    onClick?:()=>void;
}

const TimeTracker = (props:TimeTrackerProps):JSX.Element => {
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