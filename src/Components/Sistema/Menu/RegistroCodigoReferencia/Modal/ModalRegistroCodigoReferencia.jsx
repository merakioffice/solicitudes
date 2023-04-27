import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchPost, fetchPut, fetchGet } from '../../../../../api';
import { useNavigate } from 'react-router-dom';
const ModalRegistroCodigoReferencia = ({ setView, edit, view, setAddData }) => {
 
  console.log(edit,'edit')

  const toast = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      codigo: edit ? edit?.codigo : '',
      nombre: edit ? edit?.nombre : '',
    },
    onSubmit: (values) => {
      if (Object.keys(edit).length === 0) {
        registreAdd(values);
        
      } else {
        updateAdd(values);
      }
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required('El campo es requerido'),
      nombre: Yup.string().required('El campo es requerido'),

    }),
  });

  const registreAdd = (data) => {
    fetchPost('registroReferencia', 'POST', data).then(
      ({  message, codigoReferencias }) => {
        if (!codigoReferencias) {
          toast.current.show({
            severity: 'warn',
            summary: 'ocurrio un eror',
            detail: message,
          });
        } else {
          toast.current.show({
            severity: 'success',
            summary: 'Creado',
            detail: message,
          });
          setTimeout(() => {
            formik.resetForm();
            fetchGet(`/registroReferenciaAll`).then(( { codigoReferencias } ) => {
          
     
              const data = codigoReferencias.map((element, item) => {
                element.index = item;
                return element;
              });
        
              setAddData(data);
            
            });
            setView(false);
 
          }, 500);
        }
      }
    );
  };

  const updateAdd = (data) => {
    fetchPut(`registroReferenciaAll/${edit?.id}`, 'PUT', data).then((response) => {
      if (response.codigoReferencias === undefined) {
        toast.current.show({
          severity: 'warn',
          summary: 'Datos duplicados',
          detail: response.message,
        });
      } else {
        toast.current.show({
          severity: 'success',
          summary: 'Actualizado',
          detail: response.message,
        });
        setTimeout(() => {
          formik.resetForm();

            async function doIt(){
  
              const {codigoReferencias} = await  fetchGet('registroReferenciaAll')
        
              if(codigoReferencias){
                 setAddData(codigoReferencias);
              }
             
            }
        
            doIt();
          
          setView(false);
         
        }, 500);
      }
    });
  };

  return (
    <Dialog
      visible={view}
      style={{ width: '450px' }}
      header={
        edit ? 'Editar Registro de Proyecto' : 'Crear Registro de Proyecto'
      }
      modal
      className='p-fluid'
      onHide={() => {
      
        setView(false);
      }}
    >
      <Toast ref={toast} />
      <form onSubmit={formik.handleSubmit}>
        <div className='p-fluid formgrid grid'>
          <div className='field col-12 md:col-12'>
            <label htmlFor='codigo'>Código</label>

            <InputText
              type='text'
              {...formik.getFieldProps('codigo')}
              name='codigo'
              style={{ marginBottom: '5px' }}
             
            />
            {formik.touched.codigo && formik.errors.codigo && (
              <span style={{ color: '#e5432d' }}>{formik.errors.codigo}</span>
            )}
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='nombre'>Nombre</label>

            <InputText
              type='text'
            
              {...formik.getFieldProps('nombre')}
              name='nombre'
              style={{ marginBottom: '5px' }}
            />
            {formik.touched.nombre&&
              formik.errors.nombre && (
                <span style={{ color: '#e5432d' }}>
                  {formik.errors.nombre}
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
              formik.resetForm({});
             
            }}
          />
          <Button
            style={{ width: '100px', marginLeft: '20px' }}
            label={edit ? 'Editar' : 'Crear'}
            icon='pi pi-check'
            type='submit'
          />
        </div>
      </form>
    </Dialog>
  );
};

export default ModalRegistroCodigoReferencia;
