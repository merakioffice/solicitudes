import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import LeftToolBarTemplate from '../../../Molecula/LeftToolBarTemplate';
import DataTableForm from '../../../Molecula/DataTableForm';

import './styles.scss';

import service from './servicioDetalle';

const SolicitudDinero = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState(service.dataDetalle);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const openSolicitud = () => {
    console.log('click');
    navigate('/RegistroSolicitudDinero');
  };

  const editProduct = (dataObj) => {
    setDataP(dataObj);
    setProductDialog(true);
  };

  const actionBodyTemplateUno = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-warning mr-2'
        />
      </div>
    );
  };
  const actionBodyTemplateDos = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger mt-2'
        />
      </div>
    );
  };

  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          <Toast ref={toast} />
          <Toolbar
            className='mb-4'
            left={LeftToolBarTemplate({
              openNew: openSolicitud,
              nameBtn: 'Generar solicitud',
            })}
          ></Toolbar>

          <DataTableForm
            dt={dt}
            products={datas}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplateUno}
            actionBodyTemplate2={actionBodyTemplateDos}
            ColumnNameDataTable={service.ColumnNameDataTablePrincipal}
          />
        </div>
      </div>
    </div>
  );
};

export default SolicitudDinero;
