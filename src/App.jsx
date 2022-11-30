import { Routes, Route } from 'react-router-dom';
import Login from './Components/Sistema/Login';
import Dashboard from './Components/Sistema/Menu/Dashboard';

import Home from './Components/Sistema/Home';
// PrimeReact
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

// Css
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import Demostracion from './pages/Demostracion';

import {
  LugarComision,
  RegistroCargos,
  RegistroCodigoReferencia,
  RegistroDinero,
  RegistroDocumentos,
  RegistroPresupuesto,
  RegistroProyecto,
  SolicitudDinero,
} from './Components/Sistema/Menu';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route exact path={'/'} element={<Home />}>
          <Route exact path={'Dashboard'} element={<Dashboard />} />
          <Route
            exact
            path={'solicitud-dinero'}
            element={<SolicitudDinero />}
          />
          <Route
            exact
            path={'RegistroSolicitudDinero'}
            element={<RegistroDinero />}
          />
          <Route exact path={'Visor'} element={<Demostracion />} />
          <Route
            exact
            path={'registro-proyecto'}
            element={<RegistroProyecto />}
          />
          <Route
            exact
            path={'registro-presupuesto'}
            element={<RegistroPresupuesto />}
          />
          <Route
            exact
            path={'registro-referencia'}
            element={<RegistroCodigoReferencia />}
          />
          <Route exact path={'registro-cargos'} element={<RegistroCargos />} />
          <Route
            exact
            path={'registro-documentos'}
            element={<RegistroDocumentos />}
          />
          <Route exact path={'lugar-comision'} element={<LugarComision />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
