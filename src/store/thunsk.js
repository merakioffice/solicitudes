import {
  oneIdSolicitud,
  startEditSolicitud,
} from './slices/solicitud/solicitudStile';

const getSolicitudDinero = (data) => {
  return (dispatch) => {
    dispatch(startEditSolicitud());
    dispatch(oneIdSolicitud(data));
  };
};

export { getSolicitudDinero };
