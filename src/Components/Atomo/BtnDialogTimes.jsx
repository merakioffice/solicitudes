import React from "react";
import { Button } from "primereact/button";
export default function BtnDialogTimes({ OnClickTimes }) {
  return (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={OnClickTimes}
      />
    </>
  );
}
