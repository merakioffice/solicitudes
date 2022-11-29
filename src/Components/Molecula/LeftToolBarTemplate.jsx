import React from 'react';
import { Button } from 'primereact/button';

export default function LeftToolBarTemplate({
  openNew,
  nameBtn,
  ventana = true,
  // openNewDos,
  // nameBtnDos,
  ventanaAdd = true,
}) {
  let bool = false;
  if (ventana === false && ventanaAdd === false) {
    bool = true;
  }
  return (
    <div>
      <Button
        label={nameBtn}
        icon='pi pi-angle-double-left'
        onClick={openNew}
      />
    </div>
  );
}
