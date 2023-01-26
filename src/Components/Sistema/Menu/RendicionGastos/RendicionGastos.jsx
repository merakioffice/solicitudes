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

const RendicionGastos = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [addData, setAddData] = useState([]);

  // const [dataRegistro, setDataRegistro] = useState([]);

  const listData = () => {
    fetchGet('rendGastos').then(({ rendicionGastos }) => {
      const data = rendicionGastos.map((element, item) => {
        element.index = item + 1;
        return element;
      });
      setAddData(data);
    });
  };

  useEffect(() => {
    listData();
  }, []);

  const openSolicitud = () => {
    console.log('click');
    navigate('/RegistroRendicionGastos');
  };

  const editData = (data) => {
    // dispatch(getSolicitudDinero());
    // dispatch(oneIdSolicitud(data));
    navigate('/RegistroRendicionGastos');
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

  const tableButtonAutomatization = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-cog'
          className='p-button-rounded p-button-info'
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

          <DataTable value={addData} responsiveLayout='scroll'>
            <Column field='id' header='Id'></Column>
            <Column field='nombre' header='Nombre'></Column>
            <Column field='proyecto' header='Proyecto'></Column>
            <Column field='lugar' header='Lugar'></Column>
            <Column
              field='ObjetoComision'
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
