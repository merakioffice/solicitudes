import React, { useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PDFViewer } from '@react-pdf/renderer';



import { Toast } from 'primereact/toast';

const Pdf = (match) => {
  const toast = useRef(null);

  const [viewFoto, setViewFoto] = useState(null);
  const [dataFirma, setDataFirma] = useState(null);
  const data1 = localStorage.getItem('pdfdetalle');
  const data2 = localStorage.getItem('visor');
  //const data3 = localStorage.getItem('pass');
  const origen = localStorage.getItem('origen');
  console.log(origen);
  const pdfdetalle = JSON.parse(data1);
  const str = "http://localhost:8002/api"
  const visor = JSON.parse(data2);
  const usuario_ndocumento = localStorage.getItem('ndocumento');
  const mainUrlmin = str.slice(0, -4);
  console.log(mainUrlmin)

/*   const mainUrlmin = str.slice(0, -4); */
/*   useEffect(() => {

    axios
      .get(`${mainUrl}/documentos/${pdfdetalle.id}`)
      .then((res) => {
        setDataFirma(res.data.fechafirma);
      })
      .catch((error) => {
        toast.current.show({
          severity: 'error',
          summary: 'Successful',
          detail: error.response.data.message,
          life: 3000,
        });
      });
  
  }, []); */

  const firmaDoc = (product) => {
    if (viewFoto === null) {
      toast.current.show({
        severity: 'warn',
        summary: 'Hubo un error',
        detail: 'Debe agregar su firma',
        life: 3000,
      });
    } else {
/* s */
    }
    //   //var url = '/firmadocumento';
    //   //history.push(url, { detail: product });
  };
  // useEffect(() => {}, []);
  // console.log(dataFirma);
/*   const handleClickVolver = () => {
    const origen = localStorage.getItem('origen');
    if (origen === 'usuarios') {
      history.push('/Documentos');
    } else {
      history.push('/visor');
    }
  }; */


  const url1 = `${mainUrlmin}/uploads/firmado_${pdfdetalle?.nombredoc}`;
  const url2 = `${mainUrlmin}/uploads/${pdfdetalle?.nombredoc}`;
  const path = pdfdetalle.estado === true ? url1 : url2;

/*   const url1 = `${mainUrlmin}/uploads/firmado_${pdfdetalle?.nombredoc}`;
  const url2 = `${mainUrlmin}/uploads/${pdfdetalle?.nombredoc}`; */
/*   const path = pdfdetalle.estado === true ? url1 : url2; */

  // var usuario_codigo = localStorage.getItem('codigo');
  const Print = () => (
    <div>
      <PDFViewer
        height={600}
        width={'100%'}
        src={`${path}`}
        style={{ display: 'block' }}
      ></PDFViewer>
    </div>
  );
  const [url] = useState(window.location.pathname);
  const [centrar, setCentrar] = useState('');
  // console.log(url);
  useEffect(() => {
    if (url === '/viewpdf') {
      setCentrar('-150px');
    } else {
      setCentrar('0px');
    }
    viewPerfil();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const viewPerfil = async () => {
/*     const response = await axios.get(
      `${mainUrlmin}/api/imagePerson/firma_${usuario_ndocumento}`
    );

    const result = await response.data;

    setViewFoto(result.msg); */
  };
  console.log(viewFoto);
  console.log(match);
  return (
    <div
      className='mt-11 mx-11 w-full '
      style={{
        height: '100vh',
        width: '100vw important',
        
      }}
    >
      <Toast ref={toast} />

      <h5>Mis Datos</h5>
      
      <div className='card'>
        <div className='p-fluid grid'>
          <div className='field col-12 md:col-4'>
            <label htmlFor='nombre'>Nombre</label>
            <InputText disabled id='nombre' value={visor?.nombre} />
          </div>
          <div className='field col-12 md:col-4'>
            <label htmlFor='ndocumento'>N° Documento de Identidad</label>
            <InputText disabled id='ndocumento' value={visor?.ndocumento} />
          </div>
          <div className='field col-12 md:col-4'>
            <label htmlFor='ndocumento'>File:</label>
            <InputText disabled id='ndocumento' value={pdfdetalle?.nombredoc} />
          </div>
        </div>
      </div>
      <div className='m-auto '>{Print({ match })}</div>
      <div>
        {dataFirma === null && origen === 'usuarios' ? (
          ''
        ) : dataFirma === null &&
          origen === 'empleados' &&
          pdfdetalle.estado === false ? (
          <Button
            label='Firmar Documento'
            onClick={() => firmaDoc(pdfdetalle)}
            className='p-button-success mr-2 mt-2'
          />
        ) : (
          <Button
            label='Documento Firmado'
            disabled
            className='p-button-success mr-2 mt-2'
          />
        )}
        {url !== '/viewpdf' && (
          <Button
            label='Volver'
            className='p-button-success ml-2 mt-2'
            onClick={() => {
              handleClickVolver();
            }}
          />
        )}

      </div>
    </div>
  );
};

export  {Pdf};
