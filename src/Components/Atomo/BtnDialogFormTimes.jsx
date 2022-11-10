import React from "react";
import { Button } from "primereact/button";
export default function BtnDialogFormTimes({OnClickTimes}) {
  return (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={OnClickTimes}
      />
    </>
  );
}
