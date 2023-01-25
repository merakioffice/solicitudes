import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const ModalRendicionGastos = ({
  view,
  setView,
  listaSolicitudDinero,
  uuid,
}) => {
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      descripcion: '',
      partidaPresupuestal: '',
      importe: '',
    },
    onSubmit: (values) => {
      values.importe = Number(values.importe);
      values.solicitudId = uuid;
      createProduct(values);
    },
    validationSchema: Yup.object({
      fecha: Yup.string().required('La fecha es requerida'),
      serie: Yup.string().required('La serie es requerida'),
      numero: Yup.number('Solo se permiten números').required(
        'El número es requerido'
      ),
      tipo: Yup.string().required('EL tipo es requerido'),
      ruc: Yup.number('Solo se permiten números').required(
        'EL RUC es requerido'
      ),

      descripcion: Yup.string().required('La descripción es requerida'),
      partidaPresupuestal: Yup.string().required(
        'La partida presupuestal es requerido'
      ),
      importe: Yup.number('Solo se ingresan números', (data) => {
        console.log(data);
      })
        .positive('Solo se ingresan números positivos')
        .required('El importe es requerido'),
    }),
  });

  const createProduct = (data) => {
    // console.log(data);
    //  fetchPost('solicitudProducto', 'POST', data).then(() => {
    //    setView(false);
    //    formik.resetForm();
    //    listaSolicitudDinero();
    //  });
  };

  return (
    <Dialog
      visible={view}
      style={{ width: '450px' }}
      header='Creación de documentos rendidos'
      modal
      className='p-fluid'
      onHide={() => setView(false)}
    >
      <Toast ref={toast} />

      <form onSubmit={formik.handleSubmit}>
        <div className='p-fluid formgrid grid'>
          <div className='field col-12 md:col-6'>
            <label htmlFor='fecha'>Fecha</label>

            <InputText
              type='text'
              {...formik.getFieldProps('fecha')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.fecha && formik.errors.fecha && (
              <span style={{ color: '#e5432d' }}>{formik.errors.fecha}</span>
            )}
          </div>
          <div className='field col-12 md:col-6'>
            <label htmlFor='serie'>Serie</label>

            <InputText
              type='text'
              {...formik.getFieldProps('serie')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.serie && formik.errors.serie && (
              <span style={{ color: '#e5432d' }}>{formik.errors.serie}</span>
            )}
          </div>{' '}
          <div className='field col-12 md:col-6'>
            <label htmlFor='numero'>Número</label>

            <InputText
              type='text'
              {...formik.getFieldProps('numero')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.numero && formik.errors.numero && (
              <span style={{ color: '#e5432d' }}>{formik.errors.numero}</span>
            )}
          </div>{' '}
          <div className='field col-12 md:col-6'>
            <label htmlFor='tipo'>Tipo</label>

            <InputText
              type='text'
              {...formik.getFieldProps('tipo')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.tipo && formik.errors.tipo && (
              <span style={{ color: '#e5432d' }}>{formik.errors.tipo}</span>
            )}
          </div>{' '}
          <div className='field col-12 md:col-12'>
            <label htmlFor='ruc'>RUC</label>

            <InputText
              type='text'
              {...formik.getFieldProps('ruc')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.ruc && formik.errors.ruc && (
              <span style={{ color: '#e5432d' }}>{formik.errors.ruc}</span>
            )}
          </div>
          <div className='field col-12 md:col-12'>
            <label htmlFor='descripcion'>Descripcion</label>

            <InputText
              type='text'
              {...formik.getFieldProps('descripcion')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <span style={{ color: '#e5432d' }}>
                {formik.errors.descripcion}
              </span>
            )}
          </div>
          <div className='field col-12 md:col-12'>
            <label htmlFor='partidaPresupuestal'>Partida Presupuestal</label>

            <InputText
              type='text'
              {...formik.getFieldProps('partidaPresupuestal')}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.partidaPresupuestal &&
              formik.errors.partidaPresupuestal && (
                <span style={{ color: '#e5432d' }}>
                  {formik.errors.partidaPresupuestal}
                </span>
              )}
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
              setView(false);
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
};

export default ModalRendicionGastos;
