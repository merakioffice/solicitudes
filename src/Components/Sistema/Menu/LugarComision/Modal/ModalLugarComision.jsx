import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const ModalLugarComision = ({ setView, view }) => {
  const toast = useRef(null);

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
      <form>
        <div className='p-fluid formgrid grid'>
          <div className='field col-12 md:col-12'>
            <label htmlFor='codigo'>Código</label>

            <InputText
              type='text'
              // {...formik.getFieldProps('descripcion')}
              style={{ marginBottom: '5px' }}
            />
            {/* {formik.touched.descripcion && formik.errors.descripcion && (
               <span style={{ color: '#e5432d' }}>
                 {formik.errors.descripcion}
               </span>
             )} */}
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>Descripción</label>

            <InputText
              type='text'
              // {...formik.getFieldProps('partidaPresupuestal')}
              style={{ marginBottom: '5px' }}
            />
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
