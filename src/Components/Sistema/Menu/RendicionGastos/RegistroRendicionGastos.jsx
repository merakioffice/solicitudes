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
import { Row } from 'primereact/row';
import { ColumnGroup } from 'primereact/columngroup';

// import ModalCreacionProducto from './modal/ModalCreacionProducto';
import { fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { useSelector } from 'react-redux';
import { getEnvVariables } from '../../../../helpers';
import PDFRendicionGastos from './PDFRedicionGastos';
import ModalRendicionGastos from './modal/ModalRendicionGastos';
const RegistroRendicionGastos = () => {
  const { VITE_API_URL } = getEnvVariables();

  const toast = useRef(null);
  const { solicitud } = useSelector((state) => state.solicitudDinero);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [totales, setTotal] = useState(0);
  const [uuid, setUuid] = useState(null);
  const [boolCreate, setBoolCreate] = useState(false);
  // const [viewProduct, setViewProduct] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleClickRetornar = () => {
    navigate('/rendicion-gastos');
  };

  const handleClickProduct = () => {
    setView(!view);
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

  const viewPDF = () => {
    // console.log('pdf');
    navigate(`${VITE_API_URL}/solicitud/pdf`);
    // fetchGet('solicitud/pdf')
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
    // // setView(true)
  };

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header='Documento' colSpan={5} />
        <Column
          header='Descripción'
          alignHeader='center'
          style={{ width: '150px' }}
        />
        <Column
          header='Actividad'
          alignHeader='center'
          style={{ width: '120px' }}
        />
        <Column
          header='Importe'
          style={{
            width: '110px',
          }}
          alignHeader='center'
          // colSpan={5}
        />
      </Row>
      <Row>
        <Column
          header='Fecha'
          style={{ width: '70px' }}
          sortable
          alignHeader='center'
          field='lastYearSale'
        />
        <Column
          header='Serie'
          style={{ width: '90px' }}
          sortable
          alignHeader='center'
          field='lastYearProfit'
        />
        <Column
          header='Numero'
          style={{ width: '90px' }}
          sortable
          alignHeader='center'
          field='lastYearProfit'
        />
        <Column
          header='Tipo'
          style={{ width: '90px' }}
          sortable
          alignHeader='center'
          field='thisYearSale'
        />
        <Column
          header='RUC'
          style={{ width: '90px' }}
          sortable
          alignHeader='center'
          field='lastYearProfit'
        />
      </Row>
    </ColumnGroup>
  );
  console.log('=>', view);
  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />

      <div className='col-12'>
        <div className='card'>
          <Toolbar className='mb-4' right={<PDFRendicionGastos />}></Toolbar>

          <form onSubmit={formik.handleSubmit} noValidate>
            <h4>Datos Personales</h4>

            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-6'>
                <label htmlFor='numeroSolicitud' className='block'>
                  Nombre y apellidos
                </label>
                <InputText
                  name='numeroSolicitud'
                  type='text'
                  // values={formik.values.numeroSolicitud}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  disabled={boolCreate}
                />
                {/* {formik.touched.numeroSolicitud &&
                  formik.errors.numeroSolicitud && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.numeroSolicitud}
                    </span>
                  )} */}
              </div>

              <div className='field col-12 md:col-6'>
                <label htmlFor='nombre' className='block'>
                  Proyecto
                </label>
                <InputText
                  name='nombre'
                  type='text'
                  // values={formik.values.nombre}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.nombre && formik.errors.nombre && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.nombre}
                  </span>
                )} */}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='nombre' className='block'>
                  Lugar Comisión
                </label>
                <InputText
                  name='nombre'
                  type='text'
                  // values={formik.values.nombre}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.nombre && formik.errors.nombre && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.nombre}
                  </span>
                )} */}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='nombre' className='block'>
                  Objeto de la Comisión
                </label>
                <InputText
                  name='nombre'
                  type='text'
                  // values={formik.values.nombre}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.nombre && formik.errors.nombre && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.nombre}
                  </span>
                )} */}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaRegistro'>Fecha inicio</label>
                <Calendar
                  // values={formik.values.fechaRegistro}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaRegistro'
                  disabled={boolCreate}
                ></Calendar>
                {/* {formik.touched.fechaRegistro &&
                  formik.errors.fechaRegistro && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.fechaRegistro}
                    </span>
                  )} */}
              </div>
              <div className='field col-12 md:col-6'>
                <label htmlFor='fechaRegistro'>Fecha fin</label>
                <Calendar
                  // values={formik.values.fechaRegistro}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaRegistro'
                  disabled={boolCreate}
                ></Calendar>
                {/* {formik.touched.fechaRegistro &&
                  formik.errors.fechaRegistro && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.fechaRegistro}
                    </span>
                  )} */}
              </div>
            </div>
            <h4>Resumen de la rendición de las cuentas</h4>
            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-4'>
                <label htmlFor='nombreProyecto' className='block'>
                  Recibido $/
                </label>
                <InputText
                  name='nombreProyecto'
                  type='text'
                  // values={formik.values.nombreProyecto}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.nombreProyecto &&
                  formik.errors.nombreProyecto && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.nombreProyecto}
                    </span>
                  )} */}
              </div>
              <div className='field col-12 md:col-4'>
                <label htmlFor='lugarComision' className='block'>
                  Rendido $/
                </label>
                <InputText
                  name='lugarComision'
                  type='text'
                  // values={formik.values.lugarComision}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.lugarComision &&
                  formik.errors.lugarComision && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.lugarComision}
                    </span>
                  )} */}
              </div>
              <div className='field col-12 md:col-4'>
                <label htmlFor='itinerarioTransporte' className='block'>
                  Saldo $/
                </label>
                <InputText
                  name='itinerarioTransporte'
                  type='text'
                  // values={formik.values.itinerarioTransporte}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
                />
                {/* {formik.touched.itinerarioTransporte &&
                  formik.errors.itinerarioTransporte && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.itinerarioTransporte}
                    </span>
                  )} */}
              </div>
            </div>
            <h4>
              RELACIÓN DETALLADA DE LOS DOCUMENTOS RENDIDOS (Detallar por
              separado cada gasto de hospedaje, alimentación, movilidad local,
              pasajes y gastos de transporte, otros)
            </h4>
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
              label='Crear rendición'
              onClick={handleClickProduct}
            />
          </div>

          <DataTable
            value={dataRegistro.productos}
            headerColumnGroup={headerGroup}
            responsiveLayout='scroll'
          >
            <Column field='id' header='Item'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column field='partidaPresupuestal' header='Actividad'></Column>
            <Column field='importe' header='Importe'></Column>

            <Column body={tableButtonDelete}></Column>
          </DataTable>
          {view && <ModalRendicionGastos view={view} setView={setView} />}
          {/* <ModalCreacionProducto
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
            uuid={uuid}
            listaSolicitudDinero={listaSolicitudDinero}
          /> */}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default RegistroRendicionGastos;
