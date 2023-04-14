/* import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { LeftToolBarTemplate } from '../../../Molecula';
import { Button } from 'primereact/button';
import ModalRegistroDocumentos from './Modal/ModalRegistroDocumentos';
import { FileUpload } from 'primereact/fileupload';
import { fetchDelete, fetchGet, fetchPost } from '../../../../api';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const RegistroDocumentos = () => {
  const [view, setView] = useState(false);
  const [addData, setAddData] = useState([]);
  const [edit, setEdit] = useState(null);
  const toast = useRef(null);

  const listData = () => {
    fetchGet('regdoc').then(({ registroDocumento }) => {
      const data = registroDocumento.map((element, item) => {
        element.index = item + 1;
        return element;
      });
      console.log(data)
      setAddData(data);
    });
  };

  const tableButtonEdit = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-warning'
          onClick={() => editData(rowData)}
        />
      </div>
    );
  };

  const editData = (data) => {
    setView(!view);
    setEdit(data);
  };

  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            confirm1(rowData.id);
          }}
        />
      </div>
    );
  };

  const acceptFunc = (data) => {
    fetchDelete(`regdoc/${data}`).then((data) => {
      toast.current.show({
        severity: 'success',
        summary: 'Confirmado',
        detail: data.message,
        life: 3000,
      });
      listData();
    });
  };

  const confirm1 = (data) => {
    confirmDialog({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptFunc(data),
    });
  };

  const openModal = () => {
    setView(!view);
  };

  const RightToolBarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          customUpload
          uploadHandler={readExcel}
          accept='.xlsx'
          mode='basic'
          maxFileSize={1000000}
          label='Import'
          chooseLabel='Importar Documentos'
          className='mr-2 inline-block'
        />
      </React.Fragment>
    );
  };

  const readExcel = ({ files }) => {
    const [File] = files;
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const list = (data) => {
        const newData = [];
        for (let i = 1; i < data.length - 1; i++) {
          const element = data[i];
          const items = {
            codigo: element[0].toString(),
            tipoDocumento: element[1].toString(),
          };
          newData.push(items);
        }

        fetchPost('regdocAddAll', 'POST', newData).then((data) => {
          if (data.error) {
            toast.current.show({
              severity: 'error',
              summary: 'Error al subir el archivo',
              detail: data.error,
              life: 3000,
            });
          }
          if (data.repeat) {
            toast.current.show({
              severity: 'warn',
              summary: 'Datos duplicados',
              detail: 'Se esta ingresando datos existentes',
              life: 3000,
            });
          }
          if (data.message) {
            toast.current.show({
              severity: 'success',
              summary: 'Registro lugar comisión',
              detail: data.message,
              life: 3000,
            });

            listData();
          }
        });
        return newData;
      };
      list(data);
    };

    if (rABS) reader.readAsBinaryString(File);
    else reader.readAsArrayBuffer(File);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <div className='grid crud-demo'>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className='col-12'>
        <div className='card'>
          <Toolbar
            className='mb-4'
            right={RightToolBarTemplate}
            left={LeftToolBarTemplate({
              openNew: openModal,
              nameBtn: 'Crear Documento',
            })}
          ></Toolbar>
          <DataTable value={addData} responsiveLayout='scroll'>
            <Column field='index' header='Id'></Column>
            <Column field='codigo' header='Código'></Column>
            <Column field='tipoDocumento' header='Tipo Documento'></Column>
            <Column body={tableButtonEdit}></Column>
            <Column body={tableButtonDelete}></Column>
          </DataTable>
        </div>
      </div>
      {view && (
        <ModalRegistroDocumentos
          setView={setView}
          view={view}
          listData={listData}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export { RegistroDocumentos };
 */


import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { fetchDelete, fetchGet, createFormData } from '../../../../api';

import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

/* import JSZip from 'jszip';
import JSZipUtils from '../assets/JSZipUtils';
let zip = new JSZip();
 */
const RegistroDocumentos = () => {

 /*  const mainUrlmin = str.slice(0, -4); */
  const toast = useRef(null);

  const [products, setProducts] = useState([]);
  const [view] = useState(false);
  //const [text, setText] = useState('');
  const [expandedRows, setExpandedRows] = useState(null);
  const [list, setList] = useState({ download: '', href: '' });
  // const [deleteDocumentsDialog, setDeleteDocumentsDialog] = useState(false);
  const [, setPosition] = useState('center');
  const [displayBasic, setDisplayBasic] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [globalFilter1] = useState(null);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [lista, setLista] = useState(null);

  const [viewFirmados, setViewFirmados] = useState(false);
  // const customerService = new CustomerService();
/*   const empleadoService = new EmpleadoService(); */
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [deleteId, setDeleteId] = useState([]);
  const dt = useRef(null);

   const listarDatos = async  () => {

    const response =  await fetchGet('empleados')
    console.log(response.registroEmpleados)
    setProducts(response.registroEmpleados);

/*     empleadoService
      .getProductsWithOrdersSmall(selectedCity1?.name)
      .then((data) => {
        setProducts(data);
      }); */
  };
 
  // const getCustomers = (data) => {
  //   return [...(data || [])].map((d) => {
  //     d.fechaenvio = new Date(d.fechaenvio);
  //     return d;
  //   });
  // };

  const onUpload = (e) => {
    // console.log(e);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Documentos subidos correctamente',
      life: 3000,
    });
    listarDatos();
  };

  useEffect(() => {
    listarDatos();
  }, [selectedCity1]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('');
    listarDatos();
  }, [lista]); // eslint-disable-line react-hooks/exhaustive-deps
  // const history = useHistory();

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const rightToolbarTemplate = () => {
    const confirmImport = (name, position) => {
      dialogFuncMap[`${name}`](true);

      if (position) {
        setPosition(position);
      }
    };
    const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
    };

    const renderFooter = (name) => {
      return (
        <div>
          {/* <Button label="Aceptar" icon="pi pi-check" onClick={() => onHide(name)} className="p-button-text" /> */}
          <Button
            label='Aceptar'
            // icon='pi pi-check'
            onClick={() => {
              onHide(name);
              // listarDatos();
            }}
            autoFocus
          />
        </div>
      );
    };

    const confirmImportFirmado = () => {
      setViewFirmados(true);
    };

    const customBase64Uploader = (e) => {
      
      let formData = new FormData();
      e.files.map((e) => formData.append('file', e));
      createFormData(`regdocAddAll`, 
         'POST',
        formData,
      ).then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Documento Subido',
          life: 3000,
        });
      
        listarDatos();
      })
        .catch((error) => {
          // listarDatos();
          console.log(error);
        });
      // listarDatos();
    };

    return (
      <div className='grid crud-demo'>
        <Button
          label='Importar Documentos'
          icon='pi pi-upload'
          className='p-button-help'
          onClick={() => confirmImport('displayBasic')}
        />
        <Button
          label='Importar Documentos Firmados'
          icon='pi pi-upload'
          className='p-button-help'
          style={{ marginLeft: '10px' }}
          onClick={() => confirmImportFirmado()}
        />
        <Dialog
          header='Importacion de Documentos'
          visible={displayBasic}
          style={{ width: '50vw' }}
          footer={renderFooter('displayBasic')}
          onHide={() => onHide('displayBasic')}
        >
          <p>Seleccione el o los archivos a Importar en Formato PDF</p>
          <div className='card'>
            <h5>Seleccionar Archivos</h5>
            <FileUpload
              multiple
              name='image'
             /*  url={Urluploading} */
              accept='pdf/*'
              // onUpload={onUpload}
              customUpload
              uploadHandler={customBase64Uploader}
              maxFileSize={1000000}
            />
          </div>
        </Dialog>

        <Dialog
          header='Importacion de Documentos Firmados'
          visible={viewFirmados}
          style={{ width: '50vw' }}
          // footer={renderFooter('displayBasic')}
          onHide={() => setViewFirmados(false)}
        >
          <p>Seleccione archivos a Importar en Formato PDF</p>
          <div className='card'>
            <h5>Seleccionar Archivos</h5>
            <FileUpload
              multiple
              name='image'
             /*  url={urlfirmado} */
              accept='pdf/*'
              uploadHandler={onUpload}
              // onUpload={onUpload}
              maxFileSize={1000000}
            />
          </div>
        </Dialog>
      </div>
    );
  };

  const statusOrderBodyTemplate = (rowData) => {
    // console.log(rowData);
    // console.log('=>xx', rowData);
    return (
      <span
        className={`order-badge order-${rowData.estado ? 'activo' : 'cesado'}`}
      >
        {rowData.estado ? 'Activo' : 'Inactivo'}
      </span>
    );
  };

  const statusOrderBody = (rowData) => {
    // console.log('row => ', rowData.estado);
   
    const data = rowData.estado === true ? '#8ff484' : '#f4d484';
    return (
      <span
        className={`order-badge `}
        style={{ backgroundColor: data, fontWeight: '500' }}
      >
        {rowData.estado === true ? 'Firmado' : 'Pendiente'}
      </span>
    );
  };

  const editProduct = (product) => {
    localStorage.setItem('pdfdetalle', JSON.stringify(product));

    // var url = '/viewpdf';
    // history.push(url, { detail: product.nombredoc });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='actions'>
        {/* <Button icon='pi pi-user-edit' onClick={() => editProduct(rowData)} /> */}
        <a
          icon='pi pi-user-edit'
          href='/viewpdf'
          target='_blank'
          onClick={() => editProduct(rowData)}
        >
          Ver
        </a>
        {/* <Button icon='pi pi-user-edit' onClick={() => editProduct(rowData)} /> */}
      </div>
    );
  };

  const confirmDeleteDocuments = (product) => {
    setIsCloseModal(true);
    setProduct(product);
  };

  const deleteBodyTemplate = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          onClick={() => confirmDeleteDocuments(rowData)}
        />
      </div>
    );
  };

  

  const obtenerId = (e) => {
    setSelectedDocuments(e.value);
    let data;
    data = e.value.map((item) => item.id);
    setDeleteId(data);
  };

/*   const fetchDelete = async (method = '', data) => {
    const response = await fetch(`${mainUrl}/documentosall`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  }; */

  const deleteAll = () => {
    fetchDelete('DELETE', deleteId)
      .then((response) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Documentos Eliminados',
          life: 3000,
        });
        setSelectedDocuments(null);
        setDeleteId([]);
        listarDatos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchdownload = async (method = '', data) => {
    const response = await fetch(`${mainUrl}/documentosdowload`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  };

  const getAll = () => {
    fetchdownload('POST', deleteId)
      .then((response) => {
        let filename = `${mainUrlmin}/uploads/zip/${response.msg}`;

        JSZipUtils.getBinaryContent(filename, (err, data) => {
          if (err) {
            console.log(err);
            throw err;
          }
          zip.file(response.msg, data, { binary: true });
          zip.generateAsync({ type: 'blob' }).then((content) => {
            // console.log(content);
            const objectUrl = URL.createObjectURL(content);
            setList({ download: 'archivo.zip', href: objectUrl });
            let link = document.createElement('a');
            link.download = response.msg;
            link.href = objectUrl;
            link.click();
          });
        });

        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Documentos descargado',
          life: 3000,
        });

        //setText(response.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const rowExpansionTemplate = (data) => {
    // console.log(data);
    localStorage.setItem('visor', JSON.stringify(data));

    return (
      <div className='orders-subtable'>
        <h5>Detalle de Documentos para: {data.nombre}</h5>
        <DataTable
          ref={dt}
          value={data.registroDocumentos}
          selection={selectedDocuments}
          onSelectionChange={(e, index) => obtenerId(e, index)}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          className='datatable-responsive'
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords}'
          globalFilter={globalFilter1}
          emptyMessage='No Data found.'
          // header={header}
          responsiveLayout='scroll'
          // selection={selectedProducts}
          // onSelectionChange={(e) => console.log(e.value)}
        >
          <Column
            selectionMode='multiple'
            headerStyle={{ width: '3rem' }}
          ></Column>
          <Column field='id' header='Id' sortable></Column>
          <Column
            field='tipodoc'
            header='TipoDocumento'
            filter
            filterPlaceholder='Buscar Por Tipo de Documento'
            sortable
          ></Column>
          <Column
            field='nombredoc'
            header='Documento'
            filter
            filterPlaceholder='Buscar Fecha de Firmado'
            sortable
          ></Column>
          <Column
            field='fechaenvio'
            header='Fecha Envio'
            filter
            filterPlaceholder='Buscar fecha de envio'
            sortable
          ></Column>
          <Column
            field='fechafirma'
            header='Fecha Firma'
            filter
            filterPlaceholder='Buscar Fecha de Firmado'
            sortable
          ></Column>
          <Column
            field='status'
            header='Status'
            body={statusOrderBody}
            sortable
          ></Column>
          <Column
            headerStyle={{ width: '2rem' }}
            body={actionBodyTemplate}
          ></Column>
          <Column
            headerStyle={{ width: '2rem' }}
            body={deleteBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const cities = [{ name: 'todos' }, { name: 'activo' }, { name: 'inactivo' }];
  const onCityChange = (e) => {
    setSelectedCity1(e.value);
  };
  // console.log(view);
  const getDownload = () => {
    console.log('click');
  };
  const header = (
    <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
      <span className='block mt-2 md:mt-0 p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => buscador(e)}
          placeholder='Buscar...'
        />
      </span>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {deleteId.length > 0 ? (
          <>
            <button
              style={{
                marginLeft: '10px',
                backgroundColor: '#fff',
                border: '1px solid #CFD5DB',
                borderRadius: '5px',
                cursor: ' pointer',
                padding: '3px 5px',
              }}
              onClick={deleteAll}
            >
              <span
                style={{
                  color: 'rgb(130, 130, 130)',
                  fontSize: '10px',
                }}
              >
                Eliminar bloque
              </span>
            </button>
            {!view ? (
              <button
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#fff',
                  border: '1px solid #CFD5DB',
                  borderRadius: '5px',
                  cursor: ' pointer',
                  padding: '3px 5px',
                }}
                onClick={getAll}
              >
                <span
                  style={{
                    color: 'rgb(130, 130, 130)',
                    fontSize: '10px',
                  }}
                >
                  Generar descarga
                </span>
              </button>
            ) : (
              <a
                // ${mainUrlmin}/api/imagePerson/firma_${usuario_codigo}
                href={list.href}
                // target='_blank'
                download={list.download}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#fff',
                  border: '1px solid #CFD5DB',
                  borderRadius: '5px',
                  cursor: ' pointer',
                  padding: '7px 5px',
                  color: 'rgb(130, 130, 130)',
                  fontSize: '10px !important',
                }}
                onClick={getDownload}
              >
                Descargar
              </a>
            )}
          </>
        ) : (
          ''
        )}
        <Dropdown
          id='state'
          value={selectedCity1}
          options={cities}
          onChange={onCityChange}
          optionLabel='name'
          placeholder='Seleccionar'
          style={{
            marginLeft: '10px',
          }}
        />
      </div>
    </div>
  );
  const buscador = (data) => {
    setGlobalFilter(data.target.value);
  };

  const closeModal = () => {
    setIsCloseModal(!isCloseModal);
  };
  const eliminarDocumentos = () => {
    setIsCloseModal(false);
    console.log(product.id)
    fetchDelete(`regdoc/${product.id}`).then((res) => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Documento eliminado',
          life: 3000,
        });
        
        listarDatos();
      })
      .catch((error) => {
        console.log(error)
        toast.current.show({
          severity: 'error',
          summary: 'Successful',
          detail: 'Error al eliminar documento',
          life: 3000,
        });
      });
  };

  return (
    <>
      <div className='grid table-demo'>
        <Toast ref={toast} />
        <div className='col-12'>
          <div className='card'>
            <h5>Relacion de Empleados por Documentos</h5>
            <Toolbar className='mb-4' right={rightToolbarTemplate}></Toolbar>

            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              responsiveLayout='scroll'
              rowExpansionTemplate={rowExpansionTemplate}
              paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
              currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords}'
              dataKey='id'
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              globalFilter={globalFilter}
              emptyMessage='No Data found.'
              header={header}
            >
              <Column expander style={{ width: '3em' }} />
              <Column field='codigo' header='Codigo' sortable />
              <Column field='nombre' header='Nombre' sortable />
              <Column field='ndocumento' header='Documento' sortable />
              <Column field='email' header='Email' sortable />
              <Column field='cargo' header='Cargo' sortable />
              <Column
                field='activo'
                header='Status'
                body={statusOrderBodyTemplate}
                //   filterMenuStyle={{ width: '14rem' }}
                //   style={{ minWidth: '14rem' }}
                showFilterMatchModes={false}
                sortable
                //   filterElement={representativeFilterTemplate}
                //   filter
              ></Column>
              {/* <Column field='Status' header='Status' sortable /> */}
            </DataTable>
          </div>
        </div>
      </div>
      {isCloseModal &&
        EliminarDocumento({
          isCloseModal,
          closeModal,
          eliminarDocumentos,
        })}
    </>
  );
};

const EliminarDocumento = ({
  isCloseModal,
  closeModal,
  eliminarDocumentos,
}) => {
  const deleteDialogFooter = (
    <>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={closeModal}
      />
      <Button
        label='Si'
        icon='pi pi-check'
        className='p-button-text'
        onClick={() => eliminarDocumentos()}
      />
    </>
  );

  return (
    <Dialog
      visible={isCloseModal}
      style={{ width: '450px' }}
      header='Confirmar'
      modal
      footer={deleteDialogFooter}
      onHide={closeModal}
    >
      <div className='flex align-items-center justify-content-center'>
        <i
          className='pi pi-exclamation-triangle mr-3'
          style={{ fontSize: '2rem' }}
        />
        <span>Desea eliminar documento?</span>
      </div>
    </Dialog>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export {RegistroDocumentos}