import { Button } from "primereact/button";
import React from "react";

export default function BtnToolBarTemplateDanger({ openNew, nameBtn }) {
  return (
    <>
      <Button
        label={nameBtn}
        icon="pi pi-angle-double-left"
        //className="p-button-danger"
        onClick={openNew}

      />
    </>
  );
}
