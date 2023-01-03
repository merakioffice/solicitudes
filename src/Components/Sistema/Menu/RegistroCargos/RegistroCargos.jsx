import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroCargo from './Modal/ModalRegistroCargo';
import { FileUpload } from 'primereact/fileupload';
import { fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
const RegistroCargos = () => {
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(null);
  const [addData, setAddData] = useState([]);
  const toast = useRef(null);

  const listData = () => {
    fetchGet('registrocargo').then(({ registroCargo }) => {
      const data = registroCargo.map((element, item) => {
        element.index = item + 1;
        return element;
      });
      setAddData(data);
    });
  };

  const tableButtonEdit = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-warning'
          onClick={() => editData(rowData)}
        />
      </div>
    );
  };

  const editData = (data) => {
    setView(!view);
    setEdit(data);
  };

  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            confirm1(rowData.id);
          }}
        />
      </div>
    );
  };

  const acceptFunc = (data) => {
    fetchDelete(`registrocargo/${data}`).then((data) => {
      toast.current.show({
        severity: 'success',
        summary: 'Confirmado',
        detail: data.message,
        life: 3000,
      });
      listData();
    });
  };

  const confirm1 = (data) => {
    confirmDialog({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptFunc(data),
    });
  };

  const openModal = () => {
    setView(!view);
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
          chooseLabel='Importar Cargos'
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

      const list = (data) => {
        const newData = [];
        for (let i = 1; i < data.length - 1; i++) {
          const element = data[i];
          const items = {
            codigo: element[0].toString(),
            descripcion: element[1].toString(),
          };
          newData.push(items);
        }

        fetchPost('registrocargoAddAll', 'POST', newData).then((data) => {
          if (data.error) {
            toast.current.show({
              severity: 'error',
              summary: 'Error al subir el archivo',
              detail: data.error,
              life: 3000,
            });
          }
          if (data.repeat) {
            toast.current.show({
              severity: 'warn',
              summary: 'Datos duplicados',
              detail: 'Se esta ingresando datos existentes',
              life: 3000,
            });
          }
          if (data.message) {
            toast.current.show({
              severity: 'success',
              summary: 'Registro lugar comisión',
              detail: data.message,
              life: 3000,
            });

            listData();
          }
        });
        return newData;
      };
      list(data);
    };

    if (rABS) reader.readAsBinaryString(File);
    else reader.readAsArrayBuffer(File);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            left={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Crear Cargo',
            })}
            right={RightToolBarTemplate}
          ></Toolbar>
          <DataTable value={addData} responsiveLayout='scroll'>
            <Column field='index' header='Id'></Column>
            <Column field='codigo' header='Código'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      {view && (
        <ModalRegistroCargo
          setView={setView}
          view={view}
          listData={listData}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export { RegistroCargos };
