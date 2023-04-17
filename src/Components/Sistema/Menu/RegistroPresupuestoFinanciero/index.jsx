import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { LeftToolBarTemplate, RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroProsupuestoFinanciero from './Modal/ModalRegistroProsupuestoFinanciero';
import { FileUpload } from 'primereact/fileupload';
import { createFormData, fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const RegistroPresupuestoFinanciero = () => {
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);
  const listData = (filters = {page: 0, rows: 10}) => {
    const {page, rows} = filters;
    setLoading(true);
    
    fetchGet(`registroPresupuestoFinanciero?page=${page + 1}&pageSize=${rows}`).then(( { presupuestos, count } ) => {
      setTotalRecords(count);

      const data = presupuestos.map((element, item) => {
        element.index = item + 1;
        return element;
      });

      console.log(data,presupuestos)

      setAddData(data);
      setLoading(false);
    });
  };

  const openModal = () => {
    setView(!view);
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
    fetchDelete(`registroPresupuestoFinanciero/${data}`).then((data) => {
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
          chooseLabel='Importar Presupuestos'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };

  const readExcel = async ({ files }) => {
    const [File] = files;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });


      try {
        const formData = new FormData();

        formData.append('file', File);
  
        await createFormData("registroPresupuestoFinancieroAddAll", 'POST' , formData);  
        listData()
        toast.current.show({
          severity: 'success',
          summary: 'Registro lugar comisión',
          life: 3000,
        });
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al subir el archivo',
          life: 3000,
        });
      }
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
              nameBtn: 'Agregar Proyecto',
            })}
            right={RightToolBarTemplate}
          ></Toolbar>
          <DataTable value={addData} 
                responsiveLayout='scroll'
                paginator
                lazy
                rows={10} 
                totalRecords={totalRecords}
                onPage={listData}
                loading={loading}
          >
            <Column field='index' header='Id'></Column>
            <Column field='codigo' header='Código Contable'></Column>
            <Column field='nombreAbreviado' header='Nombre Abreviado'></Column>
            <Column field='nombreCompleto' header='Nombre Completo'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      {view && (
        <ModalRegistroProsupuestoFinanciero
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

export { RegistroPresupuestoFinanciero };
