import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

import { Toolbar } from 'primereact/toolbar';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import LeftToolBarTemplate from '../../../Molecula/LeftToolBarTemplate';
import ModalSolicitudDinero from './modal/ModalSolicitudDinero';
import DataTableForm from '../../../Molecula/DataTableForm';
import ModalCreacionProducto from './modal/ModalCreacionProducto';

const RegistroDimero = () => {
  // const dt = useRef(null);
  const [data, setData] = useState({});
  // const [dataProduct, setDataProduct] = useState([]);
  const navigate = useNavigate();

  const [view, setView] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);

  const handleClickRetornar = () => {
    navigate('/SolicitudDinero');
  };
  // const handleClickModal = () => {
  //   setView(!view);
  // };
  const handleClickProduct = () => {
    setViewProduct(!viewProduct);
  };

  //  TODO: use formik
  const formik = useFormik({
    initialValues: {
      numeroSolicitud: '',
      fechaRegistro: '',
      nombre: '',
      nombreProyecto: '',
      lugarComision: '',
      itenerarioTransporte: '',
      objetoComision: '',
      fechaInicio: '',
      fechaFin: '',
      products: [],
      total: 0,
    },
    onSubmit: (values) => {
      if (values.fechaRegistro) {
        const datosRegistros =
          values.fechaRegistro.getMonth() +
          1 +
          '/' +
          values.fechaRegistro.getDate() +
          '/' +
          values.fechaRegistro.getFullYear();
        values.fechaRegistro = datosRegistros;
        console.log(datosRegistros);
      }
      if (values.fechaInicio) {
        const fechaInicio =
          values.fechaInicio.getMonth() +
          1 +
          '-' +
          values.fechaInicio.getDate() +
          '-' +
          values.fechaInicio.getFullYear();
        values.fechaInicio = fechaInicio;
      }
      if (values.fechaFin) {
        const fechaFin =
          values.fechaFin.getMonth() +
          1 +
          '-' +
          values.fechaFin.getDate() +
          '-' +
          values.fechaFin.getFullYear();
        values.fechaFin = fechaFin;
      }
      //
      localStorage.setItem('solicitudDinero', JSON.stringify(values));
      setData(values);
      setView(false);
    },
    validationSchema: Yup.object({
      numeroSolicitud: Yup.number('Solo se permite numeros')
        .min(8)
        .required('Requerido'),
      nombre: Yup.string().required('Rquerido'),
      nombreProyecto: Yup.string().required('Rquerido'),
      lugarComision: Yup.string().required('Rquerido'),
      itenerarioTransporte: Yup.string().required('Rquerido'),
      objetoComision: Yup.string().required('Rquerido'),
    }),
  });
  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          {/* <Toolbar
            className='mb-4'
            left={
              <Button
                label='Retornar'
                // icon='pi-arrow-left'
                onClick={handleClickRetornar}
              />
            }
            right={
              <Button
                label='Guardar'
                // icon='pi-arrow-left'
                onClick={handleClickRetornar}
              />
            }
          ></Toolbar> */}

          {/*  */}
          <form onSubmit={formik.handleSubmit} noValidate>
            <h4>Datos Personales</h4>

            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-6'>
                <label htmlFor='numeroSolicitud' className='block'>
                  N. solicitud
                </label>
                <InputText
                  name='numeroSolicitud'
                  type='text'
                  values={formik.values.numeroSolicitud}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                />
                {formik.touched.numeroSolicitud &&
                  formik.errors.numeroSolicitud && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.numeroSolicitud}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaRegistro'>Fecha Registro</label>
                <Calendar
                  inputId='calendar'
                  values={formik.values.fechaRegistro}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // required
                  name='fechaRegistro'
                ></Calendar>
              </div>
              <div className='field col-12 md:col-12'>
                <label htmlFor='nombre' className='block'>
                  Nombre
                </label>
                <InputText
                  name='nombre'
                  type='text'
                  values={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                />
                {formik.touched.nombre && formik.errors.nombre && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.nombre}
                  </span>
                )}
              </div>
            </div>
            <h4>Informacion del proyecto</h4>
            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-6'>
                <label htmlFor='nombreProyecto' className='block'>
                  Nombre del proyecto`
                </label>
                <InputText
                  name='nombreProyecto'
                  type='text'
                  values={formik.values.nombreProyecto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                />
                {formik.touched.nombreProyecto &&
                  formik.errors.nombreProyecto && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.nombreProyecto}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='lugarComision' className='block'>
                  Lugar comisión
                </label>
                <InputText
                  name='lugarComision'
                  type='text'
                  values={formik.values.lugarComision}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                />
                {formik.touched.lugarComision &&
                  formik.errors.lugarComision && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.lugarComision}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='itenerarioTransporte' className='block'>
                  Itinerario de transporte
                </label>
                <InputText
                  name='itenerarioTransporte'
                  type='text'
                  values={formik.values.itenerarioTransporte}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                />
                {formik.touched.itenerarioTransporte &&
                  formik.errors.itenerarioTransporte && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.itenerarioTransporte}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='objetoComision' className='block'>
                  Objeto de la comisión
                </label>
                <InputText
                  name='objetoComision'
                  type='text'
                  values={formik.values.objetoComision}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.objetoComision &&
                  formik.errors.objetoComision && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.objetoComision}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaInicio'>Fecha inicio</label>
                <Calendar
                  inputId='calendar'
                  name='fechaInicio'
                  values={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  required
                ></Calendar>
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaFin'>Fecha fin</label>
                <Calendar
                  inputId='calendar'
                  values={formik.values.fechaFin}
                  onChange={formik.handleChange}
                  name='fechaFin'
                  required
                ></Calendar>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '15px',
              }}
            >
              <Button
                style={{ width: '100px', marginLeft: '20px' }}
                label='Retornar'
                // icon='pi pi-check'
                onClick={handleClickRetornar}
              />
              <Button
                style={{ width: '100px', marginLeft: '20px' }}
                label='Guardar'
                // icon='pi pi-check'
                type='submit'
              />
            </div>
          </form>
          {/*  */}
          <hr />
          {/*  */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '5px 0px',
            }}
          >
            <Button
              icon='pi pi-plus'
              className='p-button-success'
              style={{ width: '120px' }}
              label='Crear Producto'
              onClick={handleClickProduct}
            />
          </div>
          {/* poner en otro archivo */}
          <DataTable value={[]} showGridlines responsiveLayout='scroll'>
            <Column field='code' header='Item'></Column>
            <Column field='name' header='Descripción'></Column>
            <Column field='category' header='Partida Presupuestal'></Column>
            <Column field='quantity' header='Importe'></Column>
          </DataTable>
          {/*  */}
          <div>
            <button
              style={{
                border: '0px',
                padding: '5px',
                width: '645px',
                height: '30px',
                color: '#fff',
                backgroundColor: '#fff',
              }}
              disabled
            ></button>
            <button
              style={{
                border: '0px',
                padding: '5px',
                width: '260px',
                color: '#575D63',
              }}
              disabled
            >
              Total $/
            </button>
            <button
              style={{
                border: '0px',
                padding: '5px',
                width: '100px',
                backgroundColor: 'white',
                color: '#575D63',
              }}
              disabled
            >
              {/* 1234.23 */}
            </button>
          </div>
          <ModalCreacionProducto
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistroDimero;
