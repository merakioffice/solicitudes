// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
const producto = [
  {
    id: 1,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
  {
    id: 2,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
  {
    id: 3,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
  {
    id: 4,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
  {
    id: 3,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
  {
    id: 4,
    descripcion: 'hola',
    presupuesto: 'hola',
    importe: 'hola',
  },
];

const PDFSolicitud = () => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      padding: '50px 100px',
      display: 'block',
    },
    tituloBlock: {
      fontSize: '1.4rem',
      display: 'block',
      fontWeight: 700,
      padding: 10,
      textAlign: 'center',
      marginBottom: '20px',
    },
    titulo: {
      padding: 10,
      border: '0.9px dashed #dbdbdb',
    },
    tituloFormato: {
      textTransform: 'uppercase',
      border: '1px solid #dbdbdb',
      padding: 10,
    },
    institutoBlock: {
      // backgroundColor: 'coral',
      padding: 10,
      fontSize: '1.2rem',
      display: 'flex',
      justifyContent: 'flex-end',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 600,
      marginBottom: '20px',
    },
    instituto: {
      textTransform: 'uppercase',
      border: '1px solid #dbdbdb',
      padding: 10,
    },
    personalBlock: {
      // backgroundColor: 'pink',
      fontWeight: 600,
      padding: 0,
      display: 'inline-block',
      width: '100%',
      fontSize: '1.2rem',
    },
    numero: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      display: 'inline-block',
      padding: 10,
    },
    datos: {
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      display: 'inline-block',
      padding: 10,
    },
    personal1: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '67.9%',
    },
    personal2: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '89.92%',
    },
    personal3: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '88.1%',
    },
    personal4: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '81.7%',
    },
    personal5: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '78.8%',
    },
    personal6: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '79.6%',
    },
    personal7: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '38.85%',
    },
    personal71: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      padding: 10,
      fontWeight: 500,
      display: 'inline-block',
      width: '38.85%',
    },
    bordesOne: {
      border: '1px solid #dbdbdb',
      display: 'inline-block',
      padding: 10,
    },
    bordesTwo: {
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      display: 'inline-block',
      padding: 10,
    },
    bordesTree: {
      border: '1px solid #dbdbdb',
      display: 'inline-block',
      width: '75.5%',
      fontWeight: 500,
      padding: 10,
    },
    spaceTable: {
      margin: '20px 0px 0px 0px',
      display: 'block',
    },
    spaceHeader1: {
      border: '1px solid #dbdbdb',
      display: 'inline-block',
      fontWeight: 500,
      padding: 10,
    },
    spaceHeader2: {
      textTransform: 'uppercase',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      textAlign: 'center',
      width: '500px',
      display: 'inline-block',
      fontWeight: 600,
      padding: 10,
    },
    spaceHeader3: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '170px',
      display: 'inline-block',
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: 600,
      padding: 10,
    },
    spaceHeader4: {
      border: '1px solid #dbdbdb',
      width: '172px',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 600,
      display: 'inline-block',
      padding: 10,
    },
    //
    spaceBody: {
      margin: '0px 0px 0px 0px',
      display: 'block',
    },
    spaceBody1: {
      textTransform: 'uppercase',
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
      display: 'inline-block',
      fontWeight: 500,
      width: '28px',
      padding: 10,
    },
    spaceBody2: {
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
      textAlign: 'center',
      width: '500px',
      display: 'inline-block',
      padding: 10,
    },
    spaceBody3: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
      width: '170px',
      display: 'inline-block',
      textAlign: 'center',

      padding: 10,
    },
    spaceBody4: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
      width: '172px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    //
    informe: {
      margin: '10px 0px 0px 0px',
      display: 'block',
    },
    spaceInforme1: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '50px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme2: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '159px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme3: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '80px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme4: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '80px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme5: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '80px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme6: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '170px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    spaceInforme7: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      width: '170px',
      textAlign: 'center',
      display: 'inline-block',
      padding: 10,
    },
    //
    firmas: {
      margin: '10px 0px 0px 0px',
      display: 'block',
      fontSize: '1.2rem',

      // backgroundColor: 'coral',
    },
    firmas1: {
      borderLeft: '1px solid #dbdbdb',
      borderRight: 'none',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      display: 'inline-block',
      fontWeight: 600,
      padding: 10,
    },
    firmas2: {
      border: '1px solid #dbdbdb',
      display: 'inline-block',
      fontWeight: 600,
      padding: 10,
      width: '842px',
    },
    //
    firmaContainer: {
      display: 'flex',
      // backgroundColor: 'coral',
    },
    cubo1: {
      width: '600px',
      height: '160px',
      padding: '40px 20px',
      border: '1px solid #dbdbdb',
      fontSize: '1.3rem',
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
    },
    cubo: {
      width: '600px',
      height: '160px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: '20px',
      borderLeft: '1px solid #dbdbdb',
      borderRight: '1px solid #dbdbdb',
      borderTop: 'none',
      borderBottom: '1px solid #dbdbdb',
      // marginBottom: '-50px',
    },
  });

  // return (
  //   <Document style={{ backgroundColor: 'tomato' }}>
  //     <Page size='A4' style={styles.page}>
  //       <View style={styles.tituloBlock}>
  //         <View style={styles.titulo}>
  //           <Text>SOLICITUD DE VIAJE EN COMISIÓN DE SERVICIOS</Text>
  //         </View>
  //         <View style={styles.tituloFormato}>
  //           <Text>Formato-0001</Text>
  //         </View>
  //       </View>
  //       <View style={styles.institutoBlock}>
  //         <View style={styles.instituto}>
  //           <Text>Institución: Descocentro</Text>
  //         </View>
  //       </View>{' '}
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>1</Text>
  //           <Text style={styles.datos}>
  //             Nombres y Apellidos de Comisionado/a:{' '}
  //           </Text>
  //           <Text style={styles.personal1}>LAURENTE SORIANO ROCIO EDITH</Text>
  //         </View>
  //       </View>
  //       {/*  */}
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>2</Text>
  //           <Text style={styles.datos}>Cargo:</Text>
  //           <Text style={styles.personal2}> PERSONAL ADMINISTRATIVO</Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>3</Text>
  //           <Text style={styles.datos}>Proyecto:</Text>
  //           <Text style={styles.personal3}> Ingresos propios</Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>4</Text>
  //           <Text style={styles.datos}>Lugar de comisión:</Text>
  //           <Text style={styles.personal4}> Huancayo</Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>5</Text>
  //           <Text style={styles.datos}>Itinerario de transporte:</Text>
  //           <Text style={styles.personal5}> Huancayo</Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>6</Text>
  //           <Text style={styles.datos}>Objeto de la comisión:</Text>
  //           <Text style={styles.personal6}>
  //             REUNION DE COORDINACIÓN DIRECCIÓN EJECUTIVA -ADMINISTRACIÓN
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View>
  //           <Text style={styles.numero}>7</Text>
  //           <Text style={styles.datos}>Fecha Inicio</Text>
  //           <Text style={styles.personal7}>12-04-2022</Text>
  //           <Text style={styles.datos}>Fecha Fin</Text>
  //           <Text style={styles.personal71}>12-04-2022</Text>
  //         </View>
  //       </View>
  //       <View style={styles.personalBlock}>
  //         <View style={{ marginBottom: '80px' }}>
  //           <Text style={styles.bordesOne}>8</Text>
  //           <Text style={styles.bordesTwo}>Detalle de los gatos de viaje:</Text>
  //           <Text style={styles.bordesTree}>sadfasdfas</Text>
  //         </View>
  //       </View>
  //       {/*  */}
  //       <View style={styles.spaceTable}>
  //         <View>
  //           <Text style={styles.spaceHeader1}>#</Text>
  //           <Text style={styles.spaceHeader2}>Descripción</Text>
  //           <Text style={styles.spaceHeader3}>Partida Presupuestal</Text>
  //           <Text style={styles.spaceHeader4}>Importe</Text>
  //         </View>
  //       </View>
  //       {/*  */}
  //       {producto.map((item, index) => {
  //         const { descripcion, importe, presupuesto } = item;
  //         return (
  //           <View style={styles.spaceBody}>
  //             <View>
  //               <Text style={styles.spaceBody1}>{index + 1}</Text>
  //               <Text style={styles.spaceBody2}>{descripcion}</Text>
  //               <Text style={styles.spaceBody3}>{presupuesto}</Text>
  //               <Text style={styles.spaceBody4}>{importe}</Text>
  //             </View>
  //           </View>
  //         );
  //       })}
  //       <View style={styles.informe}>
  //         <View>
  //           <Text style={styles.spaceInforme1}>Lugar</Text>
  //           <Text style={styles.spaceInforme2}>San juan de lurigancho</Text>
  //           <Text style={styles.spaceInforme3}>Fecha</Text>
  //           <Text style={styles.spaceInforme4}>01</Text>
  //           <Text style={styles.spaceInforme5}>02</Text>
  //           <Text style={styles.spaceInforme5}>2022</Text>
  //           <Text style={styles.spaceInforme6}>TOTAL S/.</Text>
  //           <Text style={styles.spaceInforme7}>1234.12</Text>
  //         </View>
  //       </View>
  //       {/*  */}
  //       <View style={styles.firmas}>
  //         <View>
  //           <Text style={styles.firmas1}>9</Text>
  //           <Text style={styles.firmas2}>
  //             Recepción de fondos y autorización
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.firmaContainer}>
  //         <Text style={styles.cubo1}>
  //           En caso de no cumplir con la rendición de cuentas dentro de los
  //           plazos definidos en la Directiva de Viáticos, <b>AUTORIZO </b> a la
  //           Institución, a retener el pago de mi remuneración u honorario, según
  //           corresponda, el monto del viático otorgado asumiendo adicionalmente
  //           los intereses respectivos a que hubiere lugar, renunciando a
  //           cualquier reclamo posterior.
  //         </Text>
  //         <Text style={styles.cubo}>
  //           _____________________________ <br />
  //           Rocio Edith Laurente Soriano DNI N°
  //         </Text>
  //       </View>
  //       <View style={styles.firmaContainer}>
  //         <Text style={styles.cubo}>
  //           _____________________________ <br />
  //           FIRMA DE ADMINISTRACIÓN
  //         </Text>
  //         <View style={styles.cubo}>
  //           <Text>
  //             _____________________________ <br />
  //             FIRMA DE JEFE DE PROYECTO
  //           </Text>
  //         </View>
  //       </View>
  //     </Page>
  //   </Document>
  // );
};

export default PDFSolicitud;
