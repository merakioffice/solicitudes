import React from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import "./styles.scss";
export default function InputTextForm({
  nameLabel,
  nameInput,
  dataInput,

  onInputChange,
  getFormErrorMessage,
  required,
  disabled,
}) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();

  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()}>
          {name} {required === true && <span className="requiere">*</span>}
        </label>
        {required ? (
          <>
            <InputText
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput)}
              // required
              autoFocus
              disabled={disabled}
              className={` ${classNames({
                "p-invalid": submitted && !dataInput,
              })}`}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <InputText
            id={nameInput}
            name={nameInput}
            value={dataInput}
            onChange={(e) => onInputChange(e, nameInput)}
            autoFocus
            disabled={disabled}
          />
        )}
      </div>
    </>
  );
}
