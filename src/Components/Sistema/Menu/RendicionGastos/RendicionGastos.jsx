import React, { useEffect, useState } from 'react';

import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { LeftToolBarTemplate } from '../../../Molecula';
import useRendicionSolicitud from '../../../../hooks/useRendicionSolicitud';
import { fetchDelete, fetchGet } from '../../../../api';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
const RendicionGastos = () => {
  const [
    addData,
    listData,
    toast,
    openSolicitud,
    tableButtonEdit,
    tableButtonAutomatization,

  ] = useRendicionSolicitud();

  const [totalRecords, setTotalRecords] = useState(0);
  const [datatableState,changeDatatableState] = useState({page: 0, rows: 10, first: 10});
  const [addDatas, setAddDatas] = useState([]);



  const listDatas = (filters) => {
    const {page, rows} = datatableState || {page: 0, rows: 10, first: 10};
   
    
    fetchGet(`/rendGastos?page=${page + 1}&pageSize=${rows}`).then(( { rendicionGastos, count } ) => {
      setTotalRecords(rendicionGastos.count);

      console.log(rendicionGastos, 'ndaf')

      const promises = rendicionGastos.rows.map((element, item) => {
        return fetchGet(`regProyecto/${element.proyecto}`).then(async (res) => {
          const comision = await fetchGet(`/comision/${element.lugarComision}`)
         
          element.lugarComision = comision.lugarComision.descripcion
          element.proyectoName = res.registroProyecto.nombreAbreviado;
          element.index = item + 1;
          return element;
        });
      });

      Promise.all(promises).then((data) => {
        setAddDatas(data);
      });
     
    });
  };



  const deleteData = (data) => {
    fetchDelete(`rendGastos/${data}`).then(() => {
      listDatas();
      toast.current.show({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Se ha eliminado correctamente',
        life: 3000,
      });
    });
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

  const confirm1 = (id) => {
    confirmDialog({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteData(id),
    });
  };

  
  useEffect(() => {
    listDatas(datatableState)
  }, [datatableState])

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />
      <div className='col-12'>
        <div className='card'>
        <ConfirmDialog />
          <Toolbar
            className='mb-4'
            right={LeftToolBarTemplate({
              openNew: openSolicitud,
              nameBtn: 'Generar rendición',
            })}
          ></Toolbar>

          <DataTable value={addDatas} 
          
          lazy
          first={datatableState.first}
          rows={10}  
          totalRecords={totalRecords}
          responsiveLayout='scroll'
          onPage={(e) => changeDatatableState(e)}
            paginator
          >
            <Column field='index' header='Id'></Column>
            <Column field='nombreApellido' header='Nombre'></Column>
            <Column field='proyectoName' header='Proyecto'></Column>
            <Column field='lugarComision' header='Lugar Comisión'></Column>
            <Column
              field='objetoComision'
              header='Objeto de la comisión'
            ></Column>
            <Column
              header='Autorización'
              style={{ width: '40px' }}
              body={tableButtonAutomatization}
            ></Column>
            <Column
              header='Editar'
              style={{ width: '40px' }}
              body={tableButtonEdit}
            ></Column>
            <Column
              header='Eliminar'
              style={{ width: '40px' }}
              body={tableButtonDelete}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export { RendicionGastos };
