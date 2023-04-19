import React, { useEffect } from 'react';

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

  console.log(addData)

  useEffect(() => {

    fetchGet('rendGastos').then((res)  => {

    } )


    listData();
  }, []);

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

          <DataTable value={addData} responsiveLayout='scroll'>
            <Column field='index' header='Id'></Column>
            <Column field='nombreApellido' header='Nombre'></Column>
            <Column field='proyecto' header='Proyecto'></Column>
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
