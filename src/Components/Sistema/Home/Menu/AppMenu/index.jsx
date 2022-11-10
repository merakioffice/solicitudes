import React from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
export default function AppMenu() {
  const navigate = useNavigate();
  let menu = [
    {
      label: 'Base de Información',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-chart-bar',
          to: '/Dashboard',
          command: () => {
            navigate('/Dashboard');
          },
        },
      ],
    },
    {
      label: 'Personal',
      items: [
        {
          label: 'Registro de Usuarios',
          icon: 'pi pi-fw pi-user',
          to: '/Dashboard',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Empleados',
          icon: 'pi pi-fw pi-user',
          to: '/Dashboard',
          command: () => {
            navigate('/Visor');
          },
        },
      ],
    },
    {
      label: 'Solicitudes',
      items: [
        {
          label: 'Solicitud de dinero',
          icon: 'pi pi-fw pi-eye',
          to: '/SolicitudDinero',
          command: () => {
            navigate('/SolicitudDinero');
          },
        },
        {
          label: 'Rendicion de Gastos',
          icon: 'pi pi-fw pi-eye',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
      ],
    },
    {
      label: 'Informes',
      items: [
        {
          label: 'Registro de Actividades',
          icon: 'pi pi-fw pi-eye',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
      ],
    },
    {
      label: 'Catalogo',
      items: [
        {
          label: 'Registro de Proyectos',
          icon: 'pi pi-fw pi-eye',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Presupuestos',
          icon: 'pi pi-fw pi-eye',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Presupuestos Financiador',
          icon: 'pi pi-fw pi-eye',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Codigos de Referencia',
          icon: 'pi pi-fw pi-save',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Cargos',
          icon: 'pi pi-fw pi-save',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Tipos de Documento',
          icon: 'pi pi-fw pi-save',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Lugares Comision',
          icon: 'pi pi-fw pi-save',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
        {
          label: 'Registro de Empleados',
          icon: 'pi pi-fw pi-save',
          to: '/Visor',
          command: () => {
            navigate('/Visor');
          },
        },
      ],
    },
  ];

  return (
    <div className='layout-menu-container eliminar-li'>
      <ul className='layout-menu'>
        {menu
          ? menu.map((item, index) => {
              return (
                <div key={index}>
                  <li>
                    <p>{item.label}</p>
                  </li>
                  <ul>
                    {item.items
                      ? item.items.map((item2, index2) => {
                          return (
                            <li
                              key={index2}
                              className={'li'}
                              onClick={() => item2.command()}
                            >
                              <p key={index2}>
                                <i className={item2.icon}></i>
                                <span>{item2.label}</span>
                              </p>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}
