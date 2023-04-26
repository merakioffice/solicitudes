import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate, RightToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroProsupuesto from './Modal/ModalRegistroProsupuesto';
import { FileUpload } from 'primereact/fileupload';
import { fetchGet, createFormData, fetchDelete } from '../../../../api';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
const RegistroPresupuesto = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
  const toast = useRef(null);

  useEffect( () =>  {
    async function doIt(){

      const {presupuestos} = await  fetchGet('registroPresupuesto')

      if(presupuestos){
         setAddData(presupuestos);
      }
     

    }

    doIt();

  }, [])




  const deleteData = (id) => {
    fetchDelete(`registroPresupuesto/${id}`).then((res) => {
      navigate('/registro-presupuesto');
    })

  }

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
           onClick={() => deleteData(rowData.id)}
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
          chooseLabel='Importar Presupuesto'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };


  const listData = (data) => {
    const newData = [];
    for (let i = 1; i < data.length - 1; i++) {
      const element = data[i];
      const items = {
        id: i,
        codigo: element[0],
        proyecto: element[1],
        equivalentes: element[2],
      };
      newData.push(items);
    }

    useEffect( () =>  {
      async function doIt(){
  
        const {presupuestos} = await  fetchGet('registroPresupuesto')
  
        if(presupuestos){
           setAddData(presupuestos);
        }
       
      
       
  
      
      }
  
      doIt();
  
    }, [])

    return newData;
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

      const formData = new FormData();
      formData.append('file', File);
      

      new Promise(async (resolve) => {
        try {
        const res =  await createFormData("registroPresupuestoAddAll", 'POST' , formData);

          await 
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Empleados Created',
            life: 3000,
          });
         
          resolve(res);
          navigate('/registro-presupuesto');
          return res;
        } catch (error) {
          console.log(error)
          resolve([]);
        }
      });


      setAddData(listData(data));
    };

    if (rABS) reader.readAsBinaryString(File);
    else reader.readAsArrayBuffer(File);
  };

  return (
    <div className='grid crud-demo'>
       <Toast ref={toast} /> 
      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            right={RightToolBarTemplate}
            left={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Agregar Presupuesto',
            })}
          ></Toolbar>
          <DataTable value={addData} responsiveLayout='scroll'>
            <Column field='id' header='Id'>
              {addData.map((item, index) => {
                {
                  index + 1;
                }
              })}
            </Column>
            <Column field='codigo' header='Código'></Column>
            <Column field='nombreAbreviado' header='Nombre Abreviado'></Column>
            <Column
              field='nombreCompleto'
              header='Nombre Completo'
            ></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      <ModalRegistroProsupuesto  listData={listData} setView={setView} view={view} />
{/*       {view && (
        <ModalRegistroProsupuesto
          setView={setView}
          view={view}
          listData={listData}
          edit={edit}
          setEdit={setEdit}
        />
      )} */}
    </div>
  );
};

export { RegistroPresupuesto };
