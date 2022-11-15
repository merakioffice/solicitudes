import React from 'react';
import PDFSolicitud from '../Components/Sistema/Menu/Detalle/PDFSolicitud';
// import { InputText } from 'primereact';

export default function Detalle() {
  const ColumnNameDataTable = [
    {
      NameColumn: 'codigo',
      BodyColumn: (rowData) => {
        return (
          <>
            <span className='p-column-title'>Codigo</span>
            {rowData.codigo}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: 'nombre',
      BodyColumn: (rowData) => {
        return (
          <>
            <span className='p-column-title'>Nombre</span>
            {rowData.nombre}
          </>
        );
      },
      StyleWidthColumn: 44,
    },
    {
      NameColumn: 'Correo electronico',
      BodyColumn: (rowData) => {
        return (
          <>
            <span className='p-column-title'>Correo electronico</span>
            {rowData.email}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: 'rol',
      BodyColumn: (rowData) => {
        return (
          <>
            <span className='p-column-title'>Rol</span>
            {rowData.rol}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: 'Estado',
      BodyColumn: (rowData) => {
        let data = '';
        if (rowData.estado === true) {
          data = 'Activado';
        } else {
          data = 'Desactivado';
        }
        return (
          <>
            <span className='p-column-title'>Estado</span>
            {data}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
  ];
  let empty = {
    id_usuario: null,
    codigo: '',
    nombre: '',
    email: '',
    rol: null,
    estado: false,
  };

  return (
    <div>
      <PDFSolicitud style={{ height: '100vh', width: '100wh' }} />
    </div>
  );
}
