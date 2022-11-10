import React from 'react';
import { Dialog } from 'primereact/dialog';
import DialogFooter from '../Molecula/DialogFooter';
export default function DialogConfirmDeleteName({
  ModalDialog,
  OnClickTimes,
  OnClickCheck,
  product,
}) {
  return (
    <>
      <Dialog
        visible={ModalDialog}
        style={{ width: '450px' }}
        // header='Confirm'
        modal
        // footer={DialogFooter({ OnClickTimes, OnClickCheck })}
        // onHide={OnClickTimes}
      >
        <div className='flex align-items-center justify-content-center'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product ? (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          ) : (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </>
  );
}
