import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate, RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
// import ModalRegistroProyecto from './Modal/ModalRegistroProyecto';
import { FileUpload } from 'primereact/fileupload';

const usuario = [
  {
    id: 1,
    nombre: 'pepe',
    correo: 'corre@gmail.com',
    estado: 'activo',
  },
  {
    id: 2,
    nombre: 'pepe',
    correo: 'corre@gmail.com',
    estado: 'activo',
  },
  {
    id: 3,
    nombre: 'pepe',
    correo: 'corre@gmail.com',
    estado: 'activo',
  },
];

const RegistroEmpleado = () => {
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
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

  const RightToolBarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          customUpload
          uploadHandler={readExcel}
          accept='.xlsx'
          mode='basic'
          maxFileSize={1000000}
          label='Import'
          chooseLabel='Importar Empleados'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };

  const readExcel = ({ files }) => {
    const [File] = files;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const listData = (data) => {
        const newData = [];
        for (let i = 1; i < data.length - 1; i++) {
          const element = data[i];
          const items = {
            id: i,
            codigo: element[0],
            nombreAbreviado: element[1],
            nombreCompleto: element[2],
          };
          newData.push(items);
        }
        return newData;
      };
      setAddData(listData(data));
    };

    if (rABS) reader.readAsBinaryString(File);
    else reader.readAsArrayBuffer(File);
  };

  return (
    <div className='grid crud-demo'>
      {/* <Toast ref={toast} /> */}
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            left={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Agregar Empleado',
            })}
            right={RightToolBarTemplate}
          ></Toolbar>
          <DataTable value={usuario} responsiveLayout='scroll'>
            <Column field='id' header='Id'>
              {usuario.map((item, index) => {
                {
                  index + 1;
                }
              })}
            </Column>
            <Column field='nombre' header='Nombre'></Column>
            <Column field='correo' header='Correo'></Column>
            <Column field='estado' header='estado'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export { RegistroEmpleado };
