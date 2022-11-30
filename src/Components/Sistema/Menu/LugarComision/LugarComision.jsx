import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalLugarComision from './Modal/ModalLugarComision';
// import RightToolBarTemplate from '../../../Molecula/RightToolBarTemplate';

const datos = [
  {
    id: 1,
    codigo: 1,
    descripcion: 'Lima',
  },
  {
    id: 2,
    codigo: 2,
    descripcion: 'Piura',
  },
  {
    id: 3,
    codigo: 3,
    descripcion: 'Callao',
  },
];

const LugarComision = () => {
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
              nameBtn: 'Crea Comisión',
            })}
          ></Toolbar>
          <DataTable value={datos} responsiveLayout='scroll'>
            {/* <Column field='id' header='Id'></Column> */}
            <Column field='codigo' header='Código'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      <ModalLugarComision setView={setView} view={view} />
    </div>
  );
};

export { LugarComision };
