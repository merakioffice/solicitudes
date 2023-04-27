import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroCodigoReferencia from './Modal/ModalRegistroCodigoReferencia';
import { FileUpload } from 'primereact/fileupload';
import { createFormData, fetchDelete, fetchGet } from '../../../../api';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


const RegistroCodigoReferencia = () => {
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState();
  const [addData, setAddData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [datatableState,changeDatatableState] = useState({page: 0, rows: 10, first: 10});
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const listData = (filters) => {
    const {page, rows} = filters || {page: 0, rows: 10, first: 10};
    setLoading(true);
    
    fetchGet(`/registroReferenciaAll?page=${page + 1}&pageSize=${rows}`).then(( { codigoReferencias, count } ) => {
      setTotalRecords(count);

      const data = codigoReferencias.map((element, item) => {
        element.index = item;
        return element;
      });

      setAddData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    listData(datatableState)
  }, [datatableState])




const editData = (data) => {

  setEdit(data)
  setView(!view);

}

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

  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => confirm1(rowData.id)}
        />
      </div>
    );
  };


  const deleteData = (id) => {
    fetchDelete(`registroReferencia/${id}`).then((res) => {
      toast.current.show({
        severity: 'success',
        summary: res.message,
        life: 3000,
      });

      fetchGet(`/registroReferenciaAll`).then(( { codigoReferencias } ) => {
              const data = codigoReferencias.map((element, item) => {
                element.index = item;
                return element;
              });
        
              setAddData(data);
            
            });
    })
  }

  const confirm1 = (id) => {
    confirmDialog({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteData(id),
    });
  };

  const openModal = () => {
    setEdit('')
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
          chooseLabel='Importar Referencia'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };

  const readExcel = ({ files }) => {
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
  
        await createFormData("registroReferenciaAddAll", 'POST' , formData);  

        listData();
        toast.current.show({
          severity: 'success',
          summary: 'Registro lugar comisión',
          life: 3000,
        });
      } catch (error) {
        console.log(error)
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
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            left={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Crear Referencia',
            })}
            right={RightToolBarTemplate}
          ></Toolbar>
                  <ConfirmDialog />
          <DataTable value={addData}
                          dataKey="id" 
                          first={datatableState.first}
                          responsiveLayout='scroll'
                          paginator
                          lazy
                          rows={10} 
                          totalRecords={totalRecords}
                          onPage={(e) => changeDatatableState(e)}
                          loading={loading}
          >
            <Column field='id' header='Id'>
              {addData.map((item, index) => {
                {
                  index + 1;
                }
              })}
            </Column>
            <Column field='codigo' header='Código'></Column>
            <Column field='nombre' header='Nombre'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      <ModalRegistroCodigoReferencia setView={setView} edit={edit} setAddData={setAddData} view={view} />
    </div>
  );
};

export { RegistroCodigoReferencia };
