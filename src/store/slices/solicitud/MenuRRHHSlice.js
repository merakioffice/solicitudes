import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  estado: false,
};

export const MenuSlice = createSlice({
  name: 'MenuSlice',
  initialState,
  reducers: {
    stateMenu: (state) => {
      state.estado = !state.estado;
    },
    stateMenuMain: (state) => {
      state.estado = false;
    },
  },
});

export const { stateMenu, stateMenuMain } = MenuSlice.actions;
