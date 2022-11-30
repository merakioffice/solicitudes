import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Dropdown } from 'primereact/dropdown';

const ModalRegistroCodigoReferencia = ({ setView, view }) => {
  const toast = useRef(null);
  return (
    <Dialog
      visible={view}
      style={{ width: '550px' }}
      header='Registro Código de Referencia'
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

          <div
            className='field col-12 md:col-12'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label htmlFor='nombreAbreviado'>Exonerar</label>
              <TriStateCheckbox
                // value={value} onChange={(e) => setValue(e.value)}
                style={{ marginLeft: '5px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label htmlFor='nombreCompleto'>Categoría</label>
              <Dropdown
                // value={selectedCity1}
                // options={cities}
                // onChange={onCityChange}
                optionLabel='name'
                placeholder='Seleccionar categoría'
                style={{ marginLeft: '5px' }}
              />
              <InputText
                // {...formik.getFieldProps('importe')}
                type='text'
                style={{ marginLeft: '5px' }}
              />
            </div>
          </div>
          {/*  */}
          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>Código Documento</label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Dropdown
                // value={selectedCity1}
                // options={cities}
                // onChange={onCityChange}
                optionLabel='name'
                placeholder='Seleccionar categoría'
              />
              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                style={{ marginLeft: '5px' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '99.3%',
            }}
          >
            <div className='field ' style={{ marginLeft: '5px', width: '90%' }}>
              <label htmlFor='nombreAbreviado'>RUC</label>

              <InputText type='text' />
            </div>
            <div className='field' style={{ marginLeft: '5px', width: '90%' }}>
              <label htmlFor='nombreAbreviado'>Teléfono</label>

              <InputText type='text' />
            </div>
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>Dirección</label>

            <InputText
              type='text'
              // {...formik.getFieldProps('partidaPresupuestal')}
              style={{ marginBottom: '5px' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '99.3%',
            }}
          >
            <div
              className='field '
              style={{ marginLeft: '5px', width: '100%' }}
            >
              <label htmlFor='nombreAbreviado'>Apellido Paterno</label>

              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div
              className='field '
              style={{ marginLeft: '5px', width: '100%' }}
            >
              <label htmlFor='nombreAbreviado'>Apellido Materno</label>

              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                style={{ marginBottom: '5px' }}
              />
            </div>
          </div>
          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>Nombres</label>

            <InputText
              type='text'
              // {...formik.getFieldProps('partidaPresupuestal')}
              style={{ marginBottom: '5px' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '99.3%',
            }}
          >
            <div
              className='field '
              style={{ marginLeft: '5px', width: '100%' }}
            >
              <label htmlFor='nombreAbreviado'>Razón</label>

              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                // style={{ marginBottom: '5px' }}
              />
            </div>
            <div className='field ' style={{ marginLeft: '5px' }}>
              <label htmlFor='nombreAbreviado'>Fecha Nacimiento</label>

              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                // style={{ marginBottom: '5px' }}
              />
            </div>
          </div>

          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>Regimen</label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Dropdown
                // value={selectedCity1}
                // options={cities}
                // onChange={onCityChange}
                optionLabel='name'
                placeholder='Seleccionar regimen'
              />
              <InputText
                type='text'
                // {...formik.getFieldProps('partidaPresupuestal')}
                style={{ marginLeft: '5px' }}
              />
            </div>
          </div>
          <div className='field col-12 md:col-12'>
            <label htmlFor='nombreAbreviado'>CUPSS</label>

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
              // setViewProduct(false);
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

export default ModalRegistroCodigoReferencia;
