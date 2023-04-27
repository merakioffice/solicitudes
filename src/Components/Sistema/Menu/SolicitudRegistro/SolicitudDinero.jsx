import React, { useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './styles.scss';
import { LeftToolBarTemplate } from '../../../Molecula';
import useSolicitud from '../../../../hooks/useSolicitud';
import { fetchGet } from '../../../../api';

function SolicitudDinero() {
  const [
    listaSolicitud,
    openSolicitud,
    tableButtonEdit,
    tableButtonDelete,
    buttonAdministrator,
    buttonCoordinator,
    dataRegistro,
    toast,
  ] = useSolicitud();
  const [totalRecords, setTotalRecords] = useState(0);
  const [datatableState,changeDatatableState] = useState({page: 0, rows: 10, first: 10});
  const [addData, setAddData] = useState([]);

  const listData = (filters) => {
    const {page, rows} = filters || {page: 0, rows: 10, first: 10};
   
    
    fetchGet(`/solicitud?page=${page + 1}&pageSize=${rows}`).then(( { personal, count } ) => {
      setTotalRecords(count);

      const data = personal.map((element, item) => {
        element.index = item;
        return element;
      });

      setAddData(data);
     
    });
  };


  useEffect(() => {
    listaSolicitud();
  }, []);

  useEffect(() => {
    listData(datatableState)
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
              nameBtn: 'Generar solicitud',
            })}
          />

          <DataTable value={addData}
          azy
          first={datatableState.first}
          rows={10}  
          totalRecords={totalRecords}
          responsiveLayout='scroll'
          onPage={(e) => changeDatatableState(e)}
            paginator
          
          >
            <Column field='id' header='Item' />
            <Column field='nombre' header='Nombre' />
            <Column field='fechaInicio' header='Fecha Inicio' />
            <Column field='fechaFin' header='Fecha Fin' />
            <Column
              header='Administrador'
              style={{ width: '40px' }}
              body={buttonAdministrator}
            />
            <Column
              header='Coordinador'
              style={{ width: '40px' }}
              body={buttonCoordinator}
            />
            <Column
              header='Editar'
              style={{ width: '40px' }}
              body={tableButtonEdit}
            />
            <Column
              header='Eliminar'
              style={{ width: '30px' }}
              body={tableButtonDelete}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export { SolicitudDinero };
