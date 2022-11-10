import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function InputTextDataTable({setGlobalFilter}) {
  return (
    <>
        <InputText
          type="Buscar"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
    </>
  )
}
