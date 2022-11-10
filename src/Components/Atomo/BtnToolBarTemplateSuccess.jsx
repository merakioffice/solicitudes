import { Button } from "primereact/button";
import React from "react";

export default function BtnToolBarTemplateSuccess({ openNew, nameBtn }) {
  return (
    <>
      <Button
        label={nameBtn}
        icon="pi pi-plus"
        className="p-button-success mr-2"
        onClick={openNew}
      />
    </>
  );
}
