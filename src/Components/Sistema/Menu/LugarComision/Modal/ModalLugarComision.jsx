import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchPost } from '../../../../../api';

const ModalLugarComision = ({ setView, view, listData }) => {
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      codigo: '',
      descripcion: '',
    },
    onSubmit: (values) => {
      registreAdd(values);
    },
    validationSchema: Yup.object({
      codigo: Yup.string()
        .required('El campo es requerido')
        .min(5, 'El código debe tener mas de 5 caracteres'),
      descripcion: Yup.string().required('El campo es requerido'),
    }),
  });

  const registreAdd = (data) => {
    fetchPost('comision', 'POST', data).then((response) => {
      console.log(response);
      if (response.lugarComision) {
        toast.current.show({
          severity: 'success',
          summary: 'Creado',
          detail: response.message,
        });
        formik.resetForm();
        listData();
        setView(false);
      }
      if (!response.lugarComision) {
        toast.current.show({
          severity: 'warn',
          summary: 'Datos duplicados',
          detail: response.message,
        });
      }
    });
  };

  return (
    <Dialog
      visible={view}
      style={{ width: '450px' }}
      header='Registro de Lugar de comisión'
      modal
      className='p-fluid'
      onHide={() => setView(false)}
    >
      <Toast ref={toast} />
      <form onSubmit={formik.handleSubmit}>
        <div className='p-fluid formgrid grid'>
          <div className='field col-12 md:col-12'>
            <label htmlFor='codigo'>Código</label>

            <InputText
              type='text'
              name='codigo'
              value={formik.values.codigo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.codigo && formik.errors.codigo && (
              <span style={{ color: '#e5432d' }}>{formik.errors.codigo}</span>
            )}
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='descripcion'>Descripción</label>

            <InputText
              type='text'
              name='descripcion'
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              onBlur={formik.handleBlur}
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.descripcion && formik.errors.descripcion && (
              <span style={{ color: '#e5432d' }}>
                {formik.errors.descripcion}
              </span>
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
              // formik.resetForm({});
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

export default ModalLugarComision;
