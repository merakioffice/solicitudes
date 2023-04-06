import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MegaMenu } from 'primereact/megamenu';
import {  useSelector } from 'react-redux';
import {
  stateMenu,
  stateMenuMain,
  
} from '../../../../../store/slices/solicitud/MenuRRHHSlice';
import { getUser } from "../../../../../utils/getUser";
import { useDispatch } from 'react-redux'
export default function AppTopbar({}) {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { estado } = useSelector((state) => {
    return state.menuRRHH;
  });


  const [dataUser, setDataUser] = useState();

  useEffect( () =>  {
    async function doIt(){

      const userData = await getUser();
      
      setDataUser(userData);

    
    }

    doIt();

  }, [])


  console.log(dataUser?.rol)

  const handleClick = () => {
    dispatch(stateMenu());
    // navigate('/FyA');
  };
  const handleClickMain = () => {
    dispatch(stateMenuMain());
  };


  const megaMenuaddUser = [
    {
      label: <i className='pi pi-cog' />,
      items: [
        [
          {
            label: 'Solicitud rendiciones',
            items:[
              {
                label: 'Registro de Usuarios',
                icon: 'pi pi-fw pi-user',
                to: '/Dashboard',
                command: () => {
                  navigate('/registro-usuario');
                },
              },
              {
                label: 'Registro de Empleados',
                icon: 'pi pi-fw pi-user',
                to: '/Dashboard',
                command: () => {
                  navigate('/registro-empleado');
                },
              },
            ],
          },
        ],
      ],
    },
  ];

  const megaMenulogout = [
    {
      label: <i className='pi pi-user' />,
      items: [
        [
          {
            label: '',
            items:[
              {
                label: 'Cerrar sesion',
                icon: 'pi pi-sign-out',
                to: '/Dashboard',
                command: () => {
                  localStorage.removeItem('token');
                  navigate('/')
                },
              },
            ],
          },
        ],
      ],
      
      
    },
    
  ];


  const megamenuItems = [
    {
      label: 'RR.HH',
      items: [
        [
          {
            label: 'RR.HH',
            items: [
              {
                label: 'Ir a menu',
                className: 'disabled',
                command: () => {
                  handleClick();
                },
              },
            ],
          },
        ],
      ],
    },
  ];

  const megaMenuMain = [
    {
      label: 'RR.HH',
      items: [
        [
          {
            label: 'Solicitud rendiciones',
            items: [
              {
                label: 'Página principal',
                command: () => {
                  handleClickMain();
                },
              },
            ],
          },
        ],
      ],
    },
  ];


  return (
    <div className='layout-topbar '>
      <Link to='/Dashboard' className='layout-topbar-logo'>
        <span>Proyecto OTE</span>
      </Link>
      <button
        type='button'
        className='p-link  layout-menu-button layout-topbar-button'
      >
        <i className='pi pi-bars' />
      </button>
      <button
        type='button'
        className='p-link layout-topbar-menu-button layout-topbar-button'
      >
        <i className='pi pi-ellipsis-v' />
      </button>
      <ul className='layout-topbar-menu lg:flex origin-top'>
      <li className='mr-5'>
          {!estado ? (
            <MegaMenu model={megamenuItems} />
          ) : (
            <MegaMenu model={megaMenuMain} />
          )}
 
        </li>

        <li className='mr-5'>  
        {dataUser?.rol == "ADMIN_ROLE"  ? (
            <MegaMenu model={megaMenuaddUser} /> 
          ) : (
            ''
          )}
         
            
        </li>
      
        <li className='mr-5'>     
            <MegaMenu model={megaMenulogout} /> 
        </li>
      </ul>
    </div>
  );
}
