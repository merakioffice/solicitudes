import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroDocumentos from './Modal/ModalRegistroDocumentos';
// import RightToolBarTemplate from '../../../Molecula/RightToolBarTemplate';
const datos = [
  {
    id: 1,
    codigo: 1,
    tipoDocumento: 'Boleta',
  },
  {
    id: 2,
    codigo: 2,
    tipoDocumento: 'Factura',
  },
  {
    id: 3,
    codigo: 3,
    tipoDocumento: 'CTS',
  },
];
const RegistroDocumentos = () => {
  const [view, setView] = useState(false);

  const tableButtonEdit = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-warning'
          // onClick={() => editData(rowData)}
        />
      </div>
    );
  };
  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          // onClick={() => deleteData(rowData.id)}
        />
      </div>
    );
  };

  const openModal = () => {
    setView(!view);
  };

  return (
    <div className='grid crud-demo'>
      {/* <Toast ref={toast} /> */}
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            right={RightToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Crea Documento',
            })}
          ></Toolbar>
          <DataTable value={datos} responsiveLayout='scroll'>
            {/* <Column field='id' header='Id'></Column> */}
            <Column field='codigo' header='Código'></Column>
            <Column field='tipoDocumento' header='Tipo Documento'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      <ModalRegistroDocumentos setView={setView} view={view} />
    </div>
  );
};

export { RegistroDocumentos };
