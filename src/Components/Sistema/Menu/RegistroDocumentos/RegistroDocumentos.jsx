
import React, { useState,useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import { createFormData, fetchDelete } from "../../../../api/api";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import {fetchGet} from '../../../../api/api'
const RegistroDocumentos = () => {
  const toast = useRef(null);
const [addData, setAddData] = useState([]);
const [totalRecords, setTotalRecords] = useState(0);
const [loading, setLoading] = useState(false);

async function listData(filters = {page: 0, rows: 10}) {
  const {page, rows} = filters;
  setLoading(true);
  
  fetchGet(`tipo-documento?page=${page + 1}&pageSize=${rows}`).then(( { registroTipoDocumento, count } ) => {
    setTotalRecords(count);
    const data = registroTipoDocumento.map((element, item) => {
      element.index = item + 1;
      return element;
    });

    setAddData(data);
    setLoading(false);
  });
}

useEffect( () =>  {
  listData();
}, [])

const deleteData = async(id) => {

  fetchDelete(`delete-tipo-documento/${id}`).then((res) => {

    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Tipo de documento eliminado',
      life: 3000,
    });

    setAddData(res.result)

  }).catch((res) => {
    toast.current.show({
      severity: 'error',
      summary: 'Successful',
      detail: 'Error al eliminar tipo de documento',
      life: 3000,
    });
  })

}

  const [view, setView] = useState(false);


  const tableButtonEdit = (rowData) => {
    return (
      <div className='actions'>
{/*         <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-warning'
            onClick={() => editData(rowData)} 
        /> */}
      </div>
    );
  };

  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
           onClick={() => deleteData(rowData.id)}
        />
      </div>
    );
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
          chooseLabel='Importar Tipos de proyecto'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };

  const readExcel = ({ files }) => {
    const [File] = files;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    const formData = new FormData();

    formData.append('file', File);
    return new Promise(async (resolve) => { 

      try {
                     
        const res =  await createFormData("registro-tipo-documento", 'POST' , formData);

          await 
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tipo de documento subido',
            life: 3000,
          });
          listData();
          resolve(res);
         
          return res;
        } catch (error) {
          console.log(error)
          resolve([]);
        }
    })

  };

  return (
    <div className='grid crud-demo'>
      {/* <Toast ref={toast} /> */}
      <div className='col-12'>
        <div className='card'>
        <Toast ref={toast} />
          <Toolbar
            className='mb-4'

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
    
    </div>
  );

};



export {RegistroDocumentos}