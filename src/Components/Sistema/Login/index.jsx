import React, { useState } from 'react';
// PrimeReact
import sd from './logo.jpeg';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import './Login.scss';
export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  return (
    <div className={`containerLogin`}>
      <div className={`imgLogin`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '160px',
          }}
        >
          <img
            src={sd}
            alt='Image Text'
            className='imgscreem'
            style={{ width: '800px', height: '400px' }}
          />
        </div>
      </div>
      <div className={`formLogin`}>
        <form action='/Dashboard' className='p-fluid'>
          <h2 className='text-center'>BIENVENIDO</h2>
          <div className='field'>
            <label htmlFor='Correo electronico'>Correo electronico</label>
            <InputText
              className=''
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className='field'>
            <label htmlFor='Contraseña'>Contraseña</label>
            <Password
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              feedback={false}
            />
          </div>
          <Button type='submit' label={'Ingresar'} className='mt-2' />
        </form>
      </div>
    </div>
  );
}
