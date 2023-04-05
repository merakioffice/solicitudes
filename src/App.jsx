import React from 'react';
import { Routes, Route} from 'react-router-dom';
import  {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from './Components/Sistema/Login';
import Dashboard from './Components/Sistema/Menu/Dashboard';

import Home from './Components/Sistema/Home';
// PrimeReact
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

// Css
// import 'primereact/resources/primereact.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';


import {
  InformeRegistroActividad,
  LugarComision,
  RegistroActividad,
  RegistroCargos,
  RegistroCodigoReferencia,
  RegistroDinero,
  RegistroDocumentos,
  RegistroEmpleado,
  RegistroPresupuesto,
  RegistroProyecto,
  RegistroRendicionGastos,
  RegistroUsuario,
  RendicionGastos,
  SolicitudDinero,
  RepositorioDocumentos

} from './Components/Sistema/Menu';




function App() {
 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsUserLoggedIn(true);  
    } else {
      setIsUserLoggedIn(false)
    }
    
  }, [localStorage.getItem('token')]);

  return (
    <div>
      <Routes>
        <Route exact path={'/'} element={<Login />} />
        <Route exact path={'/'} element={<Home />}>
           <Route exact path={'Dashboard'}  element={<Dashboard isLog={isUserLoggedIn}/>} /> 


       


          <Route exact path={'repositorio-documentos'} element={<RepositorioDocumentos />} />
          <Route
            exact
            path={'registro-usuario'}
            element={<RegistroUsuario />}
          />
          <Route
            exact
            path={'registro-empleado'}
            element={<RegistroEmpleado />}
          />
          <Route
            exact
            path={'solicitud-dinero'}
            element={<SolicitudDinero />}
          />
          <Route
            exact
            path={'rendicion-gastos'}
            element={<RendicionGastos />}
          />
          <Route
            exact
            path={'RegistroRendicionGastos'}
            element={<RegistroRendicionGastos />}
          />
          <Route
            exact
            path={'RegistroSolicitudDinero'}
            element={<RegistroDinero />}
          />
          <Route
            exact
            path={'informe-actividad'}
            element={<RegistroActividad />}
          />
          <Route
            exact
            path={'registro-actividad'}
            element={<InformeRegistroActividad />}
          />
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
