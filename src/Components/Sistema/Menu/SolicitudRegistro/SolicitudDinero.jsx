import React, { useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import './styles.scss';
import { LeftToolBarTemplate } from '../../../Molecula';
import useSolicitud from '../../../../hooks/useSolicitud';

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

  useEffect(() => {
    listaSolicitud();
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
              nameBtn: 'Generar solicitud',
            })}
          />

          <DataTable value={dataRegistro} responsiveLayout='scroll'>
            <Column field='index' header='Item' />
            <Column field='nombre' header='Nombre' />
            {/* <Column field='nombreProyecto' header='Nombre Proyecto' /> */}
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
