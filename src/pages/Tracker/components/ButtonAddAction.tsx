import React, { useRef, useState } from "react";

import "./ButtonAddAction.scss";

interface ButtonAddActionProps {
   onCreate: (action: string) => void;
}

function ButtonAddAction({ onCreate }: ButtonAddActionProps): JSX.Element {
   const inputRef = useRef<HTMLInputElement>();
   const [editMode, setEditMode] = useState(false);
   const [createAction, setCreateAction] = useState("");

   function handleOnChange(event: { target?: { value?: string } }): void {
      if (!editMode) return;
      setCreateAction(event?.target?.value || "");
   }

   function handleOnKeyPress(event: { key?: string }): void {
      if (event.key === "Enter") {
         inputRef.current.blur();
      }
   }

   function handleOnBlur(): void {
      if (!editMode) return;
      const action = createAction.trim();
      setEditMode(false);
      setCreateAction("");
      if (action) onCreate(action);
      console.log(editMode, createAction);
   }

   function handleOnClick(): void {
      if (editMode) return;
      setEditMode(true);
   }

   return (
      <input
         className={`ButtonAddAction ${editMode && "editmode"}`}
         type={editMode ? "text" : "button"}
         placeholder="add new action"
         ref={inputRef}
         value={editMode ? createAction : "+"}
         onBlur={handleOnBlur}
         onChange={handleOnChange}
         onKeyPress={handleOnKeyPress}
         onClick={handleOnClick}
      />
   );
}

export default ButtonAddAction;
