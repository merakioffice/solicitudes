import React, { useEffect, useRef, useState } from 'react';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

import { Toolbar } from 'primereact/toolbar';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import ModalCreacionProducto from './modal/ModalCreacionProducto';
import { fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { useSelector } from 'react-redux';

const RegistroDinero = () => {
  const toast = useRef(null);
  const { solicitud } = useSelector((state) => state.solicitudDinero);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [totales, setTotal] = useState(0);
  const [uuid, setUuid] = useState(null);
  const [boolCreate, setBoolCreate] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleClickRetornar = () => {
    navigate('/SolicitudDinero');
  };

  const handleClickProduct = () => {
    setViewProduct(!viewProduct);
  };

  const deleteData = (data) => {
    fetchDelete(`solicitudProducto/${data.id}`).then(() => {
      listaSolicitudDinero();
      toast.current.show({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'El producto se ha eliminado correctamente',
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
          onClick={() => deleteData(rowData)}
        />
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
      numeroSolicitud: solicitud ? solicitud?.numeroSolicitud : '',
      fechaRegistro: solicitud ? solicitud?.fechaRegistro : '',
      nombre: 'hola',
      nombreProyecto: '',
      lugarComision: '',
      itinerarioTransporte: '',
      objetoComision: '',
      fechaInicio: '',
      fechaFin: '',
    },
    onSubmit: (values) => {
      // console.log(values);
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

      registreAdd(values);
    },
    validationSchema: Yup.object({
      numeroSolicitud: Yup.number('Solo se permiten números')
        .min(8)
        .required('El número de solicitud es requerido'),
      fechaRegistro: Yup.string().required('La fecha de registro es requerido'),
      nombre: Yup.string().required('El nombre es requerido'),
      nombreProyecto: Yup.string().required(
        'El nombre del proyecto es requerido'
      ),
      lugarComision: Yup.string().required('El lugar de comisión es requerido'),
      itinerarioTransporte: Yup.string().required('El itinerario es requerido'),
      objetoComision: Yup.string().required('El objeto es requerido'),
      fechaInicio: Yup.string().required('La fecha de inicio es requerido'),
      fechaFin: Yup.string().required('La fecha de fin es requerido'),
    }),
  });

  const registreAdd = (values) => {
    fetchPost('solicitud', 'POST', values).then(({ personal }) => {
      setUuid(personal.id);
      console.log(personal);
      setBoolCreate(true);
      toast.current.show({
        severity: 'success',
        summary: 'Creado',
        detail: 'Se ha creado correctamente',
        life: 3000,
      });
    });
  };

  const listaSolicitudDinero = () => {
    fetchGet(`solicitud/${uuid}`).then(({ personal, total }) => {
      setDataRegistro(personal);
      setTotal(total);
    });
  };

  useEffect(() => {
    if (uuid) {
      listaSolicitudDinero();
    }
  }, []);

  // console.log(view);

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />

      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            right={<Button label='Ver PDF' />}
            onClick={() => setView(true)}
          ></Toolbar>

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
                  disabled={boolCreate}
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
                  values={formik.values.fechaRegistro}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaRegistro'
                  disabled={boolCreate}
                ></Calendar>
                {formik.touched.fechaRegistro &&
                  formik.errors.fechaRegistro && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.fechaRegistro}
                    </span>
                  )}
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
                  disabled={boolCreate}
                />
                {formik.touched.nombre && formik.errors.nombre && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.nombre}
                  </span>
                )}
              </div>
            </div>
            <h4>Información del proyecto</h4>
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
                  disabled={boolCreate}
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
                  disabled={boolCreate}
                />
                {formik.touched.lugarComision &&
                  formik.errors.lugarComision && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.lugarComision}
                    </span>
                  )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='itinerarioTransporte' className='block'>
                  Itinerario de transporte
                </label>
                <InputText
                  name='itinerarioTransporte'
                  type='text'
                  values={formik.values.itinerarioTransporte}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  disabled={boolCreate}
                />
                {formik.touched.itinerarioTransporte &&
                  formik.errors.itinerarioTransporte && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.itinerarioTransporte}
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
                  style={{ marginBottom: '5px' }}
                  disabled={boolCreate}
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
                  name='fechaInicio'
                  values={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  disabled={boolCreate}
                ></Calendar>
                {formik.touched.fechaInicio && formik.errors.fechaInicio && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.fechaInicio}
                  </span>
                )}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaFin'>Fecha fin</label>
                <Calendar
                  values={formik.values.fechaFin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='fechaFin'
                  style={{ marginBottom: '5px' }}
                  disabled={boolCreate}
                ></Calendar>
                {formik.touched.fechaFin && formik.errors.fechaFin && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.fechaFin}
                  </span>
                )}
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
                onClick={handleClickRetornar}
              />
              <Button
                style={{ width: '100px', marginLeft: '20px' }}
                label='Guardar'
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

          <DataTable value={dataRegistro.productos} responsiveLayout='scroll'>
            <Column field='id' header='Item'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column
              field='partidaPresupuestal'
              header='Partida Presupuestal'
            ></Column>
            <Column field='importe' header='Importe'></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>

          <div>
            <button
              style={{
                border: '0px',
                padding: '5px',
                width: '445px',
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
                width: '200px',
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
                width: '200px',
                backgroundColor: '#ececec',
                color: '#575D63',
              }}
              disabled
            >
              {totales.toFixed(2)}
            </button>
          </div>
          <ModalCreacionProducto
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
            uuid={uuid}
            listaSolicitudDinero={listaSolicitudDinero}
          />
          {/*  */}
          <hr />
          {/*  */}
        </div>
        {/*  */}
      </div>
      {/*  */}

      {/*  */}
      {/* <PDFSolicitud /> */}
    </div>
  );
};

export { RegistroDinero };
