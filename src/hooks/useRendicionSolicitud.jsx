import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDelete, fetchGet } from '../api';
import { Button } from 'primereact/button';
import {
  oneIdRendicion,
  startEditRendicion,
} from '../store/slices/rendicionGastos';

const useRendicionSolicitud = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const toast = useRef(null);
  const [addData, setAddData] = useState([]);

  const listData = () => {
    fetchGet('rendGastos').then(({ rendicionGastos }) => {
      const data = rendicionGastos.map((element, item) => {
        element.index = item + 1;
        return element;
      });
      setAddData(data);
    });
  };

  const openSolicitud = () => {
    console.log('click');
    navigate('/RegistroRendicionGastos');
  };

  const editData = (data) => {
    dispatch(startEditRendicion());
    dispatch(oneIdRendicion(data));
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
    fetchDelete(`rendGastos/${data}`).then(() => {
      listData();
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

  return [
    addData,
    listData,
    toast,
    openSolicitud,
    tableButtonEdit,
    tableButtonAutomatization,
    tableButtonDelete,
  ];
};

export default useRendicionSolicitud;
