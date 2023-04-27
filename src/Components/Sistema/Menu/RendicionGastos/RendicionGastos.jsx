import React, { useEffect, useState } from 'react';

import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { LeftToolBarTemplate } from '../../../Molecula';
import useRendicionSolicitud from '../../../../hooks/useRendicionSolicitud';
import { fetchGet } from '../../../../api';

const RendicionGastos = () => {
  const [
    addData,
    listData,
    toast,
    openSolicitud,
    tableButtonEdit,
    tableButtonAutomatization,
    tableButtonDelete,
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






  
  useEffect(() => {
    listDatas(datatableState)
  }, [datatableState])

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />
      <div className='col-12'>
        <div className='card'>
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
