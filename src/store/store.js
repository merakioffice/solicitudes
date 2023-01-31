import { configureStore } from '@reduxjs/toolkit';
import { MenuSlice } from './slices/solicitud/MenuRRHHSlice';
import { regActividadSlice } from './slices/solicitud/registroActividadSlice';
import { solicitudSlice } from './slices/solicitud/solicitudStile';

const store = configureStore({
  reducer: {
    solicitudDinero: solicitudSlice.reducer,
    // regActividad: regActividadSlice.reducer,
    menuRRHH: MenuSlice.reducer,
  },
});
export { store };
