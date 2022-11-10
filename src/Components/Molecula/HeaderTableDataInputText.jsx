import React from "react";
import InputTextDataTable from "../Atomo/InputTextDataTable";

export default function HeaderTableDataInputText({setGlobalFilter,TitleName}) {
  return (
    <>
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">{TitleName}</h5>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputTextDataTable setGlobalFilter={setGlobalFilter}/>
        </span>
      </div>
    </>
  );
}
