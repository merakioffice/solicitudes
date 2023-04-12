import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroCodigoReferencia from './Modal/ModalRegistroCodigoReferencia';
import { FileUpload } from 'primereact/fileupload';
import { createFormData, fetchGet } from '../../../../api';

const RegistroCodigoReferencia = () => {
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

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


  const listData = (filters = {page: 0, rows: 10}) => {
    const {page, rows} = filters;
    setLoading(true);
    
    fetchGet(`registroReferenciaAll?page=${page + 1}&pageSize=${rows}`).then(( { codigoReferencias, count } ) => {
      setTotalRecords(count);

      const data = codigoReferencias.map((element, item) => {
        element.index = item + 1;
        return element;
      });
      setLoading(false);
      setAddData(codigoReferencias);
    });
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

      const formData = new FormData();

      formData.append('file', File);

      await createFormData("registroReferenciaAddAll", 'POST' , formData);

      const listData = (data) => {
        const newData = [];
        for (let i = 1; i < data.length - 1; i++) {
          const element = data[i];
          const items = {
            id: i,
            codigo: element[0],
            nombre: element[1],
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
  useEffect(() => {
    listData();
  }, []);

  return (
    <div className='grid crud-demo'>
      {/* <Toast ref={toast} /> */}
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
      <ModalRegistroCodigoReferencia setView={setView} view={view} />
    </div>
  );
};

export { RegistroCodigoReferencia };
