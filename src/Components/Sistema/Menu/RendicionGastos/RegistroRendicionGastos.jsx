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
import { AutoComplete } from 'primereact/autocomplete';
import { fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { useSelector } from 'react-redux';
import PDFRendicionGastos from './PDFRedicionGastos';
import ModalRendicionGastos from './modal/ModalRendicionGastos';
const RegistroRendicionGastos = () => {
  const toast = useRef(null);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [totales, setTotal] = useState(0);
  const [uuid, setUuid] = useState(null);
  const [boolCreate, setBoolCreate] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  //
  const [countries, setCountries] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);

  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [filteredProyecto, setFilteredProyecto] = useState(null);
  // const [edit, setEdit] = useState({});

  const [data, setData] = useState([]);

  const validaciones = Object.keys(selectedCountry1).length === 0;

  const listData = () => {
    fetchGet(`solicitud`).then(({ personal }) => {
      const data = personal.map((element, item) => {
        return element;
      });

      setCountries(data);
    });
  };

  const listProject = () => {
    fetchGet(`regProyecto`).then(({ registroProyecto }) => {
      const data = registroProyecto.map((element) => {
        return element;
      });
      setProyectos(data);
    });
  };

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

  const searchProject = (event) => {
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.nombre
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      setFilteredCountries(_filteredCountries);
    }, 250);
  };

  const searchProyecto = (event) => {
    // setTimeout(() => {
    let _filteredCountries;
    if (!event.query.trim().length) {
      _filteredCountries = [...proyectos];
    } else {
      _filteredCountries = proyectos.filter((country) => {
        console.log('country =>', country);
        return country.nombreAbreviado
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }
    console.log(_filteredCountries);
    setFilteredProyecto(_filteredCountries);
    // }, 250);
  };

  const formik = useFormik({
    initialValues: {
      proyecto: '',
      nombreApellido: !validaciones ? selectedCountry1?.nombre : '',
      lugarComision: '',
      objetoComision: '',
      fechaInicio: '',
      fechaFin: '',
    },
    onSubmit: (values) => {
      console.log(data);

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
      console.log('=>', values);
      // registreAdd(values);
    },
    validationSchema: Yup.object({
      nombreApellido: Yup.string().required(
        'El nombre del proyecto es requerido'
      ),
      lugarComision: Yup.string().required('El lugar de comisión es requerido'),
      objetoComision: Yup.string().required('El itinerario es requerido'),
      fechaInicio: Yup.string().required('La fecha de inicio es requerido'),
      fechaFin: Yup.string().required('La fecha de fin es requerido'),
    }),
  });

  useEffect(() => {
    if (uuid) {
      listaSolicitudDinero();
    }
    listData();
    listProject();
  }, []);

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />

      <div className='col-12'>
        <div className='card'>
          <Toolbar className='mb-4' right={<PDFRendicionGastos />}></Toolbar>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>Datos Personales</h4>
              <div>
                <AutoComplete
                  value={selectedCountry1}
                  suggestions={filteredCountries}
                  completeMethod={searchProject}
                  field='nombre'
                  name='nombreProyecto'
                  onChange={(e) => {
                    console.log(e.value);
                    setSelectedCountry1(e.value);
                    // if (selectedCountry1) {
                    //   setData(e.value);
                    // }
                  }}
                  aria-label='nombreProyecto'
                  dropdownAriaLabel='Seleccionar Proyecto'
                  // disabled={boolCreate}
                />
              </div>
            </div>

            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-6'>
                <label htmlFor='numeroSolicitud' className='block'>
                  N. solicitud
                </label>
                <InputText
                  name='numeroSolicitud'
                  type='text'
                  // value={dataLista ? dataLista.numeroSolicitud : ''}
                  disabled
                />
              </div>

              <div className='field col-12 md:col-6'>
                <label htmlFor='proyecto' className='block'>
                  Proyecto
                </label>
                <AutoComplete
                  value={selectedProyecto}
                  suggestions={filteredProyecto}
                  completeMethod={searchProyecto}
                  field='nombreAbreviado'
                  name='proyecto'
                  onChange={(e) => {
                    setSelectedProyecto(e.value);
                  }}
                  aria-label='nombreAbreviado'
                  dropdownAriaLabel='Seleccionar Proyecto'
                />
              </div>
              <div className='field col-12 md:col-12'>
                <label htmlFor='nombreApellido' className='block'>
                  Nombre y apellidos
                </label>

                <InputText
                  name='nombreApellido'
                  type='text'
                  value={formik.values.nombreApellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled
                />
                {formik.touched.nombreApellido &&
                  formik.errors.nombreApellido && (
                    <span style={{ color: '#e5432d' }}>
                      {formik.errors.nombreApellido}
                    </span>
                  )}
              </div>

              <div className='field col-12 md:col-6'>
                <label htmlFor='lugarComision' className='block'>
                  Lugar Comisión
                </label>
                <InputText
                  name='lugarComision'
                  type='text'
                  value={formik.values.lugarComision}
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
                <label htmlFor='objetoComision' className='block'>
                  Objeto de la Comisión
                </label>
                <InputText
                  name='objetoComision'
                  type='text'
                  value={formik.values.objetoComision}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  // disabled={boolCreate}
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
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaInicio'
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
                  value={formik.values.fechaFin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaFin'
                ></Calendar>
                {formik.touched.fechaFin && formik.errors.fechaFin && (
                  <span style={{ color: '#e5432d' }}>
                    {formik.errors.fechaFin}
                  </span>
                )}
              </div>
            </div>
            <h4>Resumen de la rendición de las cuentas</h4>
            <div className='p-fluid formgrid grid'>
              <div className='field col-12 md:col-4'>
                <label htmlFor='recibido' className='block'>
                  Recibido $/
                </label>
                <InputText
                  name='recibido'
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
                <label htmlFor='rendido' className='block'>
                  Rendido $/
                </label>
                <InputText
                  name='rendido'
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
                <label htmlFor='saldo' className='block'>
                  Saldo $/
                </label>
                <InputText
                  name='saldo'
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
