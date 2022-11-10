import React from 'react';

const RegistroSolicitudProducto = () => {
  return (
    <>
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
          label='Crear Producto'
          onClick={handleClickProduct}
        />
      </div>
      {/* poner en otro archivo */}
      <DataTable value={[]} showGridlines responsiveLayout='scroll'>
        <Column field='code' header='Item'></Column>
        <Column field='name' header='Descripción'></Column>
        <Column field='category' header='Partida Presupuestal'></Column>
        <Column field='quantity' header='Importe'></Column>
      </DataTable>
      {/*  */}
      <div>
        <button
          style={{
            border: '0px',
            padding: '5px',
            width: '645px',
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
            width: '260px',
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
            width: '100px',
            backgroundColor: 'white',
            color: '#575D63',
          }}
          disabled
        >
          1234.23
        </button>
      </div>
    </>
  );
};

export default RegistroSolicitudProducto;
