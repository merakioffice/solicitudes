import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPost } from '../../../../../api';

export default function ModalCreacionProducto({
  viewProduct,
  setViewProduct,
  listaSolicitudDinero,
  uuid,
}) {
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
      descripcion: Yup.string().required('La descripción es requerida'),
      partidaPresupuestal: Yup.string().required(
        'La partida presupuestal es requerido'
      ),
      importe: Yup.number().positive().required('El importe es requerido'),
    }),
  });
  const createProduct = (data) => {
    fetchPost('solicitudProducto', 'POST', data).then(() => {
      setViewProduct(false);
      formik.resetForm();
      listaSolicitudDinero();
    });
  };

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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
}
