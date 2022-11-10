import React from "react";
import BtnToolBarTemplateSuccess from "../Atomo/BtnToolBarTemplateSuccess";

export default function LeftToolBarTemplate({
  openNew,
  nameBtn,
  ventana = true,
  openNewDos,
  nameBtnDos,
  ventanaAdd = true,
}) {
  let bool = false;
  if (ventana === false && ventanaAdd === false) {
    bool = true;
  }
  return (
    <div>
      <BtnToolBarTemplateSuccess openNew={openNew} nameBtn={nameBtn} />
      {bool && (
        <>
          <BtnToolBarTemplateSuccess
            openNew={openNewDos}
            nameBtn={nameBtnDos}
          />
        </>
      )}
    </div>
  );
}
