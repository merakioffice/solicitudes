import { configureStore } from '@reduxjs/toolkit';
import { solicitudSlice } from './slices/solicitud/solicitudStile';

const store = configureStore({
  reducer: {
    solicitudDinero: solicitudSlice.reducer,
  },
});
export { store };
