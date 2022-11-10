import React from "react";
import InputTextForm from "../Atomo/InputTextForm";
import DialogFormFooter from "../Molecula/DialogFormFooter";
// PrimeReact
import { Dialog } from "primereact/dialog";
import InputNumero from "../Atomo/InputNumero";
export default function ModalFacturacion({
  productDialog,
  hideDialog,
  saveProduct,
  data,
  onInputChange,
}) {

  return (
    <Dialog
      visible={productDialog}
      style={{ width: "450px" }}
      header="Detalle del registro"
      modal
      className="p-fluid"
      footer={DialogFormFooter({
        OnClickTimes: hideDialog,
        OnClickCheck: saveProduct, //DialogFormFooter
      })}
      onHide={hideDialog}
    >
      {/* codigo_producto_servicio */}
      <InputTextForm
        nameLabel={`Codigo Producto Servicio`}
        nameInput={"codigo_producto_servicio"}
        dataInput={data.codigo_producto_servicio}
        onInputChange={onInputChange}
      />
      {/* cantidad */}
      <InputNumero
        nameLabel={`Cantidad`}
        nameInput={"cantidad"}
        dataInput={data.cantidad}
        onInputChange={onInputChange}
      />
      {/* unidad_de_medida */}
      <InputTextForm
        nameLabel={`Unidad de Medida`}
        nameInput={"unidad_de_medida"}
        dataInput={data.unidad_de_medida}
        onInputChange={onInputChange}
      />
      {/* descripcion */}
      <InputTextForm
        nameLabel={`Descripcion`}
        nameInput={"descripcion"}
        dataInput={data.descripcion}
        onInputChange={onInputChange}
      />
      {/* precio_unitario */}
      <InputNumero
        nameLabel={`Precio Unitario`}
        nameInput={"precio_unitario"}
        dataInput={data.precio_unitario}
        onInputChange={onInputChange}
      />
      {/* descuento */}
      <InputNumero
        nameLabel={`Descuento`}
        nameInput={"descuento"}
        dataInput={data.descuento}
        onInputChange={onInputChange}
      />
      {/* subtotal */}
      <InputNumero
        nameLabel={`Subtotal`}
        nameInput={"subtotal"}
        dataInput={data.subtotal}
        onInputChange={onInputChange}
      />
    </Dialog>
  );
}
