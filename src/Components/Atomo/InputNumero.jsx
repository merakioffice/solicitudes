import React from "react";
import { InputNumber } from "primereact/inputnumber";

export default function InputNumero({
    nameLabel,
    nameInput,
    dataInput,
    onInputChange,
    required,

  }) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();

  return (
    <div>
      <label htmlFor={nameLabel.toLowerCase()}>
        {name} {required === true && <span className="requiere">*</span>}
      </label>
      <InputNumber
        id={nameInput}
        name={nameInput}
        inputId={nameInput}
        value={dataInput}
        mode="decimal"
        minFractionDigits={2}
        maxFractionDigits={2}
        onValueChange={(e) => onInputChange(e, nameInput)}
        autoFocus
        
      />
    </div>
  );
}
