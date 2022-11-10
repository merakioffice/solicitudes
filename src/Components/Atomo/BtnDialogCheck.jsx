import React from "react";
import { Button } from "primereact/button";
export default function BtnDialogCheck({ OnClickCheck }) {
  return (
    <>
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={OnClickCheck}
      />
    </>
  );
}
