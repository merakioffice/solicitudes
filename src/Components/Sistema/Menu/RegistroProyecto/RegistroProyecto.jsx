import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroProyecto from './Modal/ModalRegistroProyecto';
const datos = [
  {
    id: 1,
    codigo: 654332,
    nombreAbreviado: 'OTE',
    nombreCompleto: 'Proyectos',
  },
  {
    id: 2,
    codigo: 234592,
    nombreAbreviado: 'OTE',
    nombreCompleto: 'Proyectos',
  },
  {
    id: 3,
    codigo: 536278,
    nombreAbreviado: 'OTE',
    nombreCompleto: 'Proyectos',
  },
];
const RegistroProyecto = () => {
  const [view, setView] = useState(false);

  const openModal = () => {
    setView(!view);
  };

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

  return (
    <div className='grid crud-demo'>
      {/* <Toast ref={toast} /> */}
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            right={RightToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Agregar Proyecto',
            })}
          ></Toolbar>
          <DataTable value={datos} responsiveLayout='scroll'>
            <Column field='id' header='Id'></Column>
            <Column field='codigo' header='Código Contable'></Column>
            <Column field='nombreAbreviado' header='Nombre Abreviado'></Column>
            <Column field='nombreCompleto' header='Nombre Completo'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      {<ModalRegistroProyecto setView={setView} view={view} />}
    </div>
  );
};

export { RegistroProyecto };
