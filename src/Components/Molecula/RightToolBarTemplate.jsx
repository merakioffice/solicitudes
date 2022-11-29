import React from 'react';
import { Button } from 'primereact/button';

export default function RightToolBarTemplate({ openNew, nameBtn }) {
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
