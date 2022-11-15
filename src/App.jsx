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
import { useState } from 'react';
// import Detalle from './Components/Sistema/Menu/Detalle/SolicitudDinero';
import Demostracion from './pages/Demostracion';
import RegistroDinero from './Components/Sistema/Menu/Detalle/RegistroDinero';
import SolicitudDinero from './Components/Sistema/Menu/Detalle/SolicitudDinero';

function App() {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route exact path={'/'} element={<Home />}>
          <Route exact path={'Dashboard'} element={<Dashboard />} />
          <Route exact path={'SolicitudDinero'} element={<SolicitudDinero />} />
          <Route
            exact
            path={'RegistroSolicitudDinero'}
            element={<RegistroDinero />}
          />
          <Route exact path={'Visor'} element={<Demostracion />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
