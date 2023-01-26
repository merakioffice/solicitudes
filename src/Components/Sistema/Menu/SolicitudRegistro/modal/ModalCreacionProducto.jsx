import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchGet, fetchPost } from '../../../../../api';

export default function ModalCreacionProducto({
  viewProduct,
  setViewProduct,
  listaSolicitudDinero,
  uuid,
}) {
  const toast = useRef(null);
  //
  const [countries, setCountries] = useState([]);
  const [selectedCountry1, setSelectedCountry1] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const [descript, setDescript] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountrie, setFilteredCountrie] = useState(null);

  const [dataLista, setDataLista] = useState({
    descripcion: null,
    partidaPresupuestal: null,
    nameState: false,
  });

  const listData = () => {
    fetchGet('regProyecto').then(({ registroProyecto }) => {
      const data = registroProyecto.map((element, item) => {
        return element;
      });
      setCountries(data);
    });

    fetchGet('comision').then(({ lugar }) => {
      const data = lugar.map((element, item) => {
        return element;
      });
      setDescript(data);
    });
  };

  //
  const formik = useFormik({
    initialValues: {
      descripcion: '',
      partidaPresupuestal: '',
      importe: '',
    },
    onSubmit: (values) => {
      values.importe = Number(values.importe);
      values.solicitudId = uuid;
      values.descripcion = dataLista.descripcion;
      values.partidaPresupuestal = dataLista.partidaPresupuestal;

      createProduct(values);
    },
    validationSchema: Yup.object({
      // descripcion: Yup.string().required('La descripción es requerida'),
      // partidaPresupuestal: Yup.string().required(
      //   'La partida presupuestal es requerido'
      // ),
      importe: Yup.number('Solo se ingresan números', (data) => {
        console.log(data);
      })
        .positive('Solo se ingresan números positivos')
        .required('El importe es requerido'),
    }),
  });

  const createProduct = (data) => {
    fetchPost('solicitudProducto', 'POST', data).then(() => {
      setViewProduct(false);
      formik.resetForm();
      listaSolicitudDinero();
    });
  };

  const searchPartidaPresupuestal = (event) => {
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.nombreAbreviado
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      setFilteredCountries(_filteredCountries);
    }, 250);
  };

  const searchDescription = (event) => {
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...descript];
      } else {
        _filteredCountries = descript.filter((country) => {
          return country.descripcion
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }
      setFilteredCountrie(_filteredCountries);
    }, 250);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <Dialog
      visible={viewProduct}
      style={{ width: '450px' }}
      header='Creación de producto'
      modal
      className='p-fluid'
      onHide={() => setViewProduct(false)}
    >
      <Toast ref={toast} />

      <form onSubmit={formik.handleSubmit}>
        <div className='p-fluid formgrid grid'>
          <div className='field col-12 md:col-12'>
            <label htmlFor='descripcion'>Descripción</label>
            <AutoComplete
              value={selectedCountry}
              suggestions={filteredCountrie}
              completeMethod={searchDescription}
              field='descripcion'
              name='descripcion'
              onChange={(e) => {
                setSelectedCountry(e.value);
                if (selectedCountry) {
                  dataLista.descripcion = e.value.id;
                }
              }}
              aria-label='descripcion'
              dropdownAriaLabel='Seleccionar descripcion'
            />
            {/* <InputText
              type='text'
              {...formik.getFieldProps('descripcion')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <span style={{ color: '#e5432d' }}>
                {formik.errors.descripcion}
              </span>
            )} */}
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='partidaPresupuestal'>Partida Presupuestal</label>
            <AutoComplete
              value={selectedCountry1}
              suggestions={filteredCountries}
              completeMethod={searchPartidaPresupuestal}
              field='nombreAbreviado'
              name='partidaPresupuestal'
              onChange={(e) => {
                setSelectedCountry1(e.value);
                if (selectedCountry1) {
                  dataLista.partidaPresupuestal = e.value.id;
                }
              }}
              aria-label='partidaPresupuestal'
              dropdownAriaLabel='Seleccionar partida presupuestal'
            />
            {/* <InputText
              type='text'
              {...formik.getFieldProps('partidaPresupuestal')}
              style={{ marginBottom: '5px' }}
            /> */}
            {/* {formik.touched.partidaPresupuestal &&
              formik.errors.partidaPresupuestal && (
                <span style={{ color: '#e5432d' }}>
                  {formik.errors.partidaPresupuestal}
                </span>
              )} */}
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='importe'>Importe</label>

            <InputText
              {...formik.getFieldProps('importe')}
              type='text'
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.importe && formik.errors.importe && (
              <span style={{ color: '#e5432d' }}>{formik.errors.importe}</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            label='No'
            style={{ width: '100px' }}
            icon='pi pi-times'
            className='p-button-text'
            type='button'
            onClick={() => {
              setViewProduct(false);
              formik.resetForm({});
            }}
          />
          <Button
            style={{ width: '100px', marginLeft: '20px' }}
            label='Crear'
            icon='pi pi-check'
            type='submit'
          />
        </div>
      </form>
    </Dialog>
  );

  // autoTable(doc, {
  //   // columnStyles: { europe: { halign: 'center' } }, // European countries centered
  //   body: [
  //     solicitud?.solicitud_productos?.map(
  //       ({ descripcion, partidaPresupuestal, importe }) => {
  //         return [descripcion, partidaPresupuestal, importe];
  //         // return [  'Id'= index + 1,  'descripcion' = item.description,  'partidaPresupuestal'= item.partidaPresupuestal, 'importe'= item.importe  ]
  //       }
  //     ),
  //   ],
  //   columns: [
  //     // { header: 'Id', dataKey: 'Id' },
  //     { header: 'Descripcion', dataKey: 'descripcion' },
  //     { header: 'Partida Presupuestal', dataKey: 'partidaPresupuestal' },
  //     { header: 'Importe', dataKey: 'importe' },
  //   ],
  // });
}
