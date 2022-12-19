import React, { useState, useRef, useEffect } from 'react';

import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
// import './styles.scss';
import { fetchDelete, fetchGet } from '../../../../api';
// import { useDispatch } from 'react-redux';
// import { getSolicitudDinero } from '../../../../store/thunsk';
// import { oneIdSolicitud } from '../../../../store/slices/solicitud/solicitudStile';
import { LeftToolBarTemplate } from '../../../Molecula';

const gastos = [
  {
    id: 1,
    nombre: 'pepe',
    proyecto: 'pepe',
    lugar: 'pepe',
    ObjetoComision: 'pepe',
  },
  {
    id: 2,
    nombre: 'pepe',
    proyecto: 'pepe',
    lugar: 'pepe',
    ObjetoComision: 'pepe',
  },
  {
    id: 3,
    nombre: 'pepe',
    proyecto: 'pepe',
    lugar: 'pepe',
    ObjetoComision: 'pepe',
  },
];
const RegistroActividad = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  // const [dataRegistro, setDataRegistro] = useState([]);

  const listaSolicitud = () => {
    // fetchGet('solicitud').then(({ personal }) => setDataRegistro(personal));
  };

  useEffect(() => {
    listaSolicitud();
  }, []);

  const openSolicitud = () => {
    console.log('click');
    //  navigate('/RegistroRendicionGastos');
  };

  const editData = (data) => {
    // dispatch(getSolicitudDinero());
    // dispatch(oneIdSolicitud(data));
    //  navigate('/RegistroRendicionGastos');
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

  const deleteData = (data) => {
    fetchDelete(`solicitud/${data}`).then(() => {
      listaSolicitud();
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
          onClick={() => deleteData(rowData.id)}
        />
      </div>
    );
  };
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

          <DataTable value={gastos} responsiveLayout='scroll'>
            <Column field='id' header='Id'></Column>
            <Column field='nombre' header='Nombre'></Column>
            <Column field='proyecto' header='Fecha'></Column>
            <Column field='lugar' header='Destino'></Column>
            <Column
              field='ObjetoComision'
              header='Objeto de la comisión'
            ></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default RegistroActividad;
