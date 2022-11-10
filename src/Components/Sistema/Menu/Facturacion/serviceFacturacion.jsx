let emptyFactura = {
  id_producto: null,
  codigo_producto_servicio: "",
  cantidad: 0,
  unidad_de_medida: 0,
  descripcion: "",
  precio_unitario: 0,
  descuento: 0,
  subtotal: 0,
};
let dataFactura =[
  {
    id_producto: 1,
    codigo_producto_servicio: "0001",
    cantidad: 2,
    unidad_de_medida: "null",
    descripcion: "Detalle",
    precio_unitario: 50,
    descuento: 0.00,
    subtotal: 100,
  }
]

const ColumnNameDataTableFactura = [
  {
    NameColumn: "CÓDIGO PRODUCTO / SERVICIO",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">CÓDIGO PRODUCTO / SERVICIO</span>
          {rowData.codigo_producto_servicio}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "CANTIDAD",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">CANTIDAD</span>
          {rowData.cantidad}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "UNIDAD DE MEDIDA",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">UNIDAD DE MEDIDA</span>
          {rowData.unidad_de_medida}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "DESCRIPCIÓN",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">DESCRIPCIÓN</span>
          {rowData.descripcion}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "PRECIO UNITARIO",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">PRECIO UNITARIO</span>
          {rowData.precio_unitario}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "DESCUENTO",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">DESCUENTO</span>
          {rowData.descuento}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "SUBTOTAL",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">SUBTOTAL</span>
          {rowData.subtotal}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
];

export default {
  ColumnNameDataTable,
  empty,
  dataFactura
};
