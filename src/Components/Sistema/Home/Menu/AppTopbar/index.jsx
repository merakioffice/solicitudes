import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MegaMenu } from 'primereact/megamenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  stateMenu,
  stateMenuMain,
} from '../../../../../store/slices/solicitud/MenuRRHHSlice';

export default function AppTopbar() {
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const { estado } = useSelector((state) => {
    return state.menuRRHH;
  });

  const handleClick = () => {
    dispatch(stateMenu());
    // navigate('/FyA');
  };
  const handleClickMain = () => {
    dispatch(stateMenuMain());
  };

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



  const megaMenuaddUser = [
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
        <li>
          {!estado ? (
            <MegaMenu model={megamenuItems} />
          ) : (
            <MegaMenu model={megaMenuMain} />
          )}

        </li>
        <li>
          <button
            className='p-link layout-topbar-button'
        
          >
            <i className='pi pi-cog' />
            <span>Settings</span>
          </button>
        </li>
        <li>
          <button
            className='p-link layout-topbar-button'
            // onClick={handleSeccion}
          >
            <i className='pi pi-user' />
            <span>Profile</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
