import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  solicitud: {},
  isEditSolicitud: false,
};

export const solicitudSlice = createSlice({
  name: 'solicitudDinero',
  initialState,
  reducers: {
    oneIdSolicitud: (state, action) => {
      state.solicitud = action.payload;
    },
    startEditSolicitud: (state) => {
      state.isEditSolicitud = true;
    },
  },
});

export const { oneIdSolicitud, startEditSolicitud } = solicitudSlice.actions;
