import React from "react";
import { Button } from "primereact/button";
export default function BtnDialogFormCheck({ OnClickCheck }) {
  return (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={OnClickCheck}
      />
    </>
  );
}
