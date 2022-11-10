import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
export default function DataTableForm({
  dt,
  products,
  selectedProducts,
  setSelectedProducts,
  globalFilter,
  header,
  actionBodyTemplate,
  actionBodyTemplate2,
  ColumnNameDataTable,
}) {
  return (
    <>
      <DataTable
        ref={dt}
        value={products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        globalFilter={globalFilter}
        emptyMessage="No products found."
        header={header}
        responsiveLayout="scroll"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        {ColumnNameDataTable?.map((item, index) => {
          let name =
            item.NameColumn.charAt(0).toUpperCase() +
            item.NameColumn.slice(1).toLowerCase();
          return (
            <Column
              key={index}
              field={item.NameColumn.toLowerCase()}
              header={name}
              sortable
              body={item.BodyColumn}
              headerStyle={{
                width: `${item.StyleWidthColumn}%`,
                minWidth: "10rem",
              }}
            ></Column>
          );
        })}

        <Column body={actionBodyTemplate}></Column>
        <Column body={actionBodyTemplate2}></Column>
      </DataTable>
    </>
  );
}
