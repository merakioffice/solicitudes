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
  const { rendicionGastos } = useSelector((state) => state.rendicionGastos);
  const [edit, setEdit] = useState(rendicionGastos);
  const validation = Object.keys(edit).length === 0;

  const toast = useRef(null);
  const [dataRegistro, setDataRegistro] = useState([]);
  const [totales, setTotal] = useState(0);
  const [uuid, setUuid] = useState(!validation ? edit.id : null);
  const [boolCreate, setBoolCreate] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  //
  const [countries, setCountries] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null);

  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(
    !validation ? edit.proyecto : null
  );
  const [filteredProyecto, setFilteredProyecto] = useState(null);

  const [data, setData] = useState([]);

  const [dataLista, setDataLista] = useState({
    nombreProyecto: null,
    nameState: false,
    numeroSolicitud: rendicionGastos ? rendicionGastos.numeroRendicion : null,
  });

  const validaciones = Object.keys(data).length === 0;

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
    fetchDelete(`rendGastosProducts/${data.id}`).then(() => {
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

  const listaSolicitudDinero = () => {
    fetchGet(`rendGastos/${uuid}`).then(({ rendGastosProducts, total }) => {
      setDataRegistro(rendGastosProducts);
      setTotal(total);
    });
  };

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header='Documento' colSpan={5} />
        <Column
          header='Descripción'
          field='descripcion'
          // alignHeader='center'
          style={{ width: '150px' }}
        />
        <Column
          header='Actividad'
          field='actividad'
          // alignHeader='center'
          style={{ width: '120px' }}
        />
        <Column
          header='Importe'
          field='importe'
          style={{
            width: '110px',
          }}
          // alignHeader='center'
          // colSpan={5}
        />
      </Row>
      <Row>
        <Column
          header='Fecha'
          style={{ width: '70px' }}
          sortable
          // alignHeader='center'
          field='fecha'
        />
        <Column
          header='Serie'
          style={{ width: '90px' }}
          sortable
          // alignHeader='center'
          field='serie'
        />
        <Column
          header='Numero'
          style={{ width: '90px' }}
          sortable
          // alignHeader='center'
          field='numero'
        />
        <Column
          header='Tipo'
          style={{ width: '90px' }}
          sortable
          // alignHeader='center'
          field='tipo'
        />
        <Column
          header='RUC'
          style={{ width: '90px' }}
          sortable
          // alignHeader='center'
          field='ruc'
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
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...proyectos];
      } else {
        _filteredCountries = proyectos.filter((country) => {
          return country.nombreAbreviado
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredProyecto(_filteredCountries);
    }, 200);
  };

  const formik = useFormik({
    initialValues: {
      proyecto: '',
      nombreApellido: !validation ? edit.nombreApellido : '',
      lugarComision: !validation ? edit.lugarComision : '',
      objetoComision: !validation ? edit.objetoComision : '',
      fechaInicio: !validation ? edit.fechaInicio : '',
      fechaFin: '',
    },
    onSubmit: (values) => {
      values.nombreApellido = data.nombre;
      values.proyecto = selectedProyecto.id;

      registreAdd(values);
    },
    validationSchema: Yup.object({
      // lugarComision: Yup.string().required('El lugar de comisión es requerido'),
      // objetoComision: Yup.string().required('El itinerario es requerido'),
      // fechaInicio: Yup.string().required('La fecha de inicio es requerido'),
      // fechaFin: Yup.string().required('La fecha de fin es requerido'),
    }),
  });

  const registreAdd = (values) => {
    fetchPost('rendGastos', 'POST', values).then((response) => {
      if (response.rendicionGastos) {
        setDataLista({
          numeroSolicitud: response.rendicionGastos
            ? response.rendicionGastos.numeroRendicion
            : '',
        });
        setUuid(response.rendicionGastos.id);

        setBoolCreate(true);
        toast.current.show({
          severity: 'success',
          summary: 'Creado',
          detail: 'Se ha creado correctamente',
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: 'warn',
          summary: 'Hubo un error',
          detail: `${response.message}`,
          life: 3000,
        });
      }
    });
  };

  const sumRecibido = () => {
    if (!validaciones && selectedCountry1.solicitud_productos.length > 0) {
      const suma = selectedCountry1.solicitud_productos
        .map((item) => {
          let variable = Number(item.importe);
          return variable;
        })
        .reduce((prev, curr) => prev + curr, 0);

      setTotal(suma);
    }
  };

  useEffect(() => {
    if (uuid) {
      listaSolicitudDinero();
    }
    listData();
    listProject();
  }, []);

  useEffect(() => {
    setData(selectedCountry1);
    sumRecibido();
  }, [selectedCountry1]);

  useEffect(() => {
    sumRecibido();
  }, [data]);

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
                    setSelectedCountry1(e.value);
                    // if (selectedCountry1) {
                    //   // sumRecibido();
                    //   setData(e.value);
                    // }
                  }}
                  dropdown
                  aria-label='nombreProyecto'
                  dropdownAriaLabel='Seleccionar Proyecto'
                  disabled={boolCreate}
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
                  value={dataLista ? dataLista.numeroSolicitud : ''}
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
                  id='proyecto'
                  onChange={(e) => {
                    setSelectedProyecto(e.value);
                  }}
                  dropdown
                  aria-label='nombreAbreviado'
                  dropdownAriaLabel='Seleccionar Proyecto'
                  disabled={boolCreate}
                />
              </div>
              <div className='field col-12 md:col-12'>
                <label htmlFor='nombreApellido' className='block'>
                  Nombre y apellidos
                </label>

                <InputText
                  id='nombreApellido'
                  name='nombreApellido'
                  // onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  style={{ marginBottom: '5px' }}
                  type='text'
                  value={
                    !validaciones
                      ? data.nombre
                      : !validation
                      ? edit.nombreApellido
                      : ''
                  }
                  disabled
                />
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
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '5px' }}
                  name='fechaInicio'
                  disabled={boolCreate}
                  showIcon
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
                  showIcon
                  disabled={boolCreate}
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
                  value={totales.toFixed(2)}
                  style={{ marginBottom: '5px' }}
                  disabled
                />
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
            {/* <Column field='id' header='Item'></Column> */}
            <Column field='fecha' header='Fecha'></Column>
            <Column field='serie' header='Serie'></Column>
            <Column field='numero' header='Numero'></Column>
            <Column field='tipo' header='Tipo'></Column>
            <Column field='ruc' header='Ruc'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column field='partidaPresupuestal' header='Actividad'></Column>
            <Column field='importe' header='Importe'></Column>

            <Column body={tableButtonDelete} style={{ width: '20px' }}></Column>
          </DataTable>
          {view && (
            <ModalRendicionGastos
              view={view}
              setView={setView}
              uuid={uuid}
              listaSolicitudDinero={listaSolicitudDinero}
            />
          )}
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
