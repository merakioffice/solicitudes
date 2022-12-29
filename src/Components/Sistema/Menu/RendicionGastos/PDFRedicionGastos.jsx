import { Button } from 'primereact/button';

import jsPDF from 'jspdf';

const PDFRendicionGastos = () => {
  const descarga = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setDrawColor(195, 195, 195);
    doc.rect(20, 15, 118, 10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'bold');
    doc.text('RENDICIÓN DE GASTOS', 70, 21.5);

    doc.setFontSize(9);
    doc.rect(138, 15, 51, 10);
    doc.text('FORMATO - 001', 149, 21.5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('INSTITUCIÓN: descocentro', 140, 32);

    doc.rect(20, 36, 169, 6);
    doc.text('Nombres y Apellidos:  LAURENTE SORIANO ROCIO EDITH', 25, 40);

    doc.rect(20, 42, 169, 6);
    doc.text('Proyecto: Ingresos propios', 25, 46);

    doc.rect(20, 47.95, 169, 6);
    doc.text('Lugar de comisión: Huancayo ', 25, 52);

    doc.rect(20, 53.9, 169, 6);
    doc.text(
      'Objeto de la comisión: REUNION DE COORDINACION DIRECCION EJECUTIVA -ADMINISTRACION',
      25,
      58
    );

    doc.rect(20, 60, 169, 6);
    doc.text('Fecha  Inicio:__/__/20__', 25, 64);
    doc.text('Termino: __/__/20__', 120, 64);

    doc.rect(20, 66, 169, 11);
    doc.text('Resumen de la rendición de cuentas', 25, 70);
    doc.text('RECIBIDO S/1234423.', 25, 75);
    doc.text('RENDIDO S/4234134', 90, 75);
    doc.text('SALDO S/4213412412.', 150, 75);

    doc.rect(20, 77, 169, 11);
    doc.text(
      'RELACIÓN DETALLADA DE LOS DOCUMENTOS RENDIDOS (Detallar por separado cada gasto de hospedaje, alimentación,',
      25,
      81
    );
    doc.text('movilidad local, pasajes y gastos de transporte, otros)', 25, 85);

    doc.text('Id', 25, 97);
    doc.rect(20, 90, 13, 12);

    doc.text('Documento', 52, 94);
    doc.rect(33, 90, 53, 6);

    doc.text('Fecha', 37, 100);
    doc.rect(33, 96, 18, 6);

    doc.text('Tipo', 57, 100);
    doc.rect(51, 96, 18, 6);

    doc.text('Numero', 72, 100);
    doc.rect(69, 96, 17, 6);

    doc.text('Descripción', 106, 97);
    doc.rect(86, 90, 53, 12);

    doc.text('Actividad', 146, 97);
    doc.rect(139, 90, 25, 12);

    doc.text('Importe', 171, 97);
    doc.rect(164, 90, 25, 12);
    //
    doc.text('10/10/2022', 35, 106);
    doc.text('Boleta', 55, 106);
    doc.text('002-6879', 71, 106);
    doc.text('Descripcion', 105, 106);
    doc.text('1000.00', 170, 106);

    doc.rect(20, 102, 169, 6);

    doc.text('10/10/2022', 35, 112);
    doc.text('Boleta', 55, 112);
    doc.text('002-000006', 71, 112);
    doc.text('movilidad local, pasajes', 105, 112);
    doc.text('1000.00', 170, 112);
    doc.rect(20, 108, 169, 6);

    //
    doc.text('Total', 146, 118);
    doc.rect(139, 114, 25, 6);

    doc.text('2000.00', 171, 118);
    doc.rect(164, 114, 25, 6);
    //

    doc.text('_________________________', 40, 278);
    doc.text('FIRMA DE COMISIONADO/A', 42, 282);
    doc.rect(20, 254, 82, 30);

    doc.text('_________________________', 128, 278);
    doc.text('FIRMA DE JEFE DE PROYECTO', 126, 282);
    doc.rect(102, 254, 83, 30);

    doc.save('a4.pdf');
  };
  return (
    <>
      <Button onClick={descarga}>Descargar PDF</Button>
    </>
  );
};

export default PDFRendicionGastos;
