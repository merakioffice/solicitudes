let dataDetalle = [
  {
    id: '1',
    nombre: 'BLOOMCKER',
    cargo: 'Programador',
    fecha_inicio: '10-09-2022',
    products: [
      {
        id: 1,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 2,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 3,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 4,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 5,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
    ],
    total: 2744.0,
  },
  {
    id: '1',
    nombre: 'BLOOMCKER',
    cargo: 'Programador',
    fecha_inicio: '10-09-2022',
    products: [
      {
        id: 1,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 2,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 3,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 4,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 5,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
    ],
    total: 2744.0,
  },
  {
    id: '1',
    nombre: 'BLOOMCKER',
    cargo: 'Programador',
    fecha_inicio: '10-09-2022',
    products: [
      {
        id: 1,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 2,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 3,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 4,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 5,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
    ],
    total: 2744.0,
  },
  {
    id: '1',
    nombre: 'BLOOMCKER',
    cargo: 'Programador',
    fecha_inicio: '10-09-2022',
    products: [
      {
        id: 1,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 2,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 3,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 4,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
      {
        id: 5,
        descripcion: '0001',
        partidaPresupuestal: 2,
        importe: 20,
      },
    ],
    total: 2744.0,
  },
];

const ColumnNameDataTablePrincipal = [
  {
    NameColumn: 'Index',
    BodyColumn: (rowData) => {
      return <>{rowData.item}</>;
    },
    StyleWidthColumn: 10,
  },
  {
    NameColumn: 'Nombre',
    BodyColumn: (rowData) => {
      return <>{rowData.nombre}</>;
    },
    StyleWidthColumn: 35,
  },
  {
    NameColumn: 'Cargo',
    BodyColumn: (rowData) => {
      return <>{rowData.cargo}</>;
    },
    StyleWidthColumn: 35,
  },
  {
    NameColumn: 'Fecha inicio',
    BodyColumn: (rowData) => {
      return <>{rowData.fecha_inicio}</>;
    },
    StyleWidthColumn: 10,
  },
];

let emptyFactura = {
  id_factura: null,
  factura_n: '',
  empresa: '',
  direccion: '',
  cod_autorizacion: '',
  fecha: '',
  nombre_razon_social: '',
  nit_ci_cex: '',
  cod_cliente: '',
  products: [],
  total: 0,
};
let emptyProduct = {
  id_producto: null,
  codigo_producto_servicio: '',
  cantidad: 0,
  unidad_de_medida: '',
  descripcion: '',
  precio_unitario: 0,
  descuento: 0,
  subtotal: 0,
};
const ColumnNameDataTableFactura = [
  {
    NameColumn: 'Item',
    BodyColumn: (rowData) => {
      return (
        <>
          {/* <span className='p-column-title'>CÓDIGO PRODUCTO / SERVICIO</span> */}
          {rowData.codigo_producto_servicio}
        </>
      );
    },
    StyleWidthColumn: 10,
  },
  {
    NameColumn: 'Descripcion',
    BodyColumn: (rowData) => {
      return (
        <>
          {/* <span className='p-column-title'>CANTIDAD</span> */}
          {rowData.cantidad}
        </>
      );
    },
    StyleWidthColumn: 60,
  },
  {
    NameColumn: 'Partida presupuestal',
    BodyColumn: (rowData) => {
      return (
        <>
          {/* <span className='p-column-title'>UNIDAD DE MEDIDA</span> */}
          {rowData.unidad_de_medida}
        </>
      );
    },
    StyleWidthColumn: 30,
  },
  {
    NameColumn: 'Importe',
    BodyColumn: (rowData) => {
      return (
        <>
          {/* <span className='p-column-title'>DESCRIPCIÓN</span> */}
          {rowData.descripcion}
        </>
      );
    },
    StyleWidthColumn: 20,
  },
];

function format(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, '0');

  month = month.toString().padStart(2, '0');

  return `${date}-${month}-${year}`;
}
export default {
  dataDetalle,
  ColumnNameDataTablePrincipal,
  ColumnNameDataTableFactura,
  emptyProduct,
  emptyFactura,
  format,
};
