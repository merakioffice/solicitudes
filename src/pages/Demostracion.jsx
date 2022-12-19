import { pdf, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'primereact/button';

import PDFSolicitud from '../Components/Sistema/Menu/SolicitudRegistro/PDFSolicitud';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Demostracion = () => {
  // const descarga = () => {
  //   const input = document.getElementById('pdf');
  //   html2canvas(input, {
  //     backgroundColor: '#ffffff',
  //     logging: true,
  //     letterRendering: 1,
  //     useCORS: true,
  //   }).then((canvas) => {
  //     const imgWidth = 208;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const imgData = canvas.toDataURL('img/png');

  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(imgData, 'PNG', 0.9, 0.9, imgWidth, imgHeight);
  //     pdf.save('datos.pdf');
  //   });
  // };
  const descarga = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    // doc.setLineDash([1, 1.5, 1, 1.5, 1, 1.5]);
    doc.setDrawColor(239, 239, 239);
    doc.rect(60, 15, 85, 13);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD DE VIAJE EN COMISIÓN', 70, 20);
    doc.text('DE SERVICIOS.', 90, 25);

    doc.setFontSize(9);
    // doc.setFont('helvetica', 'normal');
    doc.rect(145, 15, 35, 13);
    doc.text('FORMATO - 001', 150, 22.5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('INSTITUCIÓN: descocentro - 001', 140, 40);

    doc.save('a4.pdf');
  };
  return (
    <>
      {/* <PDFViewer style={{ height: '100vh', width: '100wh' }}> */}
      <Button onClick={descarga}>Descargar PDF</Button>
      {/* <header id='pdf' style={{ backgroundColor: '#fff' }}> */}
      {/* <header id='pdf' style={{ backgroundColor: '#fff' }}> */}
      {/* <PDFSolicitud style={{ height: '100vh', width: '100wh' }} /> */}
      {/* </header> */}

      {/* </header> */}
      {/* </PDFViewer> */}
    </>
  );
};

export default Demostracion;
