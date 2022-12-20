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
import PDFActividad from './PDFActividad';
// import PDFRendicionGastos from './PDFRedicionGastos';
import { InputTextarea } from 'primereact/inputtextarea';
const InformeRegistroActividad = () => {
  const { VITE_API_URL } = getEnvVariables();

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
    navigate('/informe-actividad');
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

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />

      <div className='col-12'>
        <div className='card'>
          <Toolbar className='mb-4' right={<PDFActividad />}></Toolbar>

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
                  Destino
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
              <div className='field col-12 md:col-12'>
                <label htmlFor='nombreProyecto' className='block'>
                  Objeto de la comisión:
                </label>
                <InputTextarea
                  //  value={value2}
                  //  onChange={(e) => setValue2(e.target.value)}
                  rows={5}
                  cols={30}
                  autoResize
                />
              </div>
              <div className='field col-12 md:col-12'>
                <label htmlFor='lugarComision' className='block'>
                  Detalle de actividad realizada:
                </label>
                <InputTextarea
                  //  value={value2}
                  //  onChange={(e) => setValue2(e.target.value)}
                  rows={7}
                  cols={30}
                  autoResize
                />
              </div>
              <div className='field col-12 md:col-12'>
                <label htmlFor='itinerarioTransporte' className='block'>
                  Otros aspectos administrativos relevantes que afecten su
                  rendición de cuentas
                </label>
                <InputTextarea
                  //  value={value2}
                  //  onChange={(e) => setValue2(e.target.value)}
                  rows={8}
                  cols={30}
                  autoResize
                />
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
          {/*  */}

          {/* <div>
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
           </div> */}
          {/* <ModalCreacionProducto
             viewProduct={viewProduct}
             setViewProduct={setViewProduct}
             uuid={uuid}
             listaSolicitudDinero={listaSolicitudDinero}
           /> */}
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

export default InformeRegistroActividad;
