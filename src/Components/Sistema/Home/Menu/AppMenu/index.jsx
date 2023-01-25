import React from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function AppMenu() {
  const navigate = useNavigate();
  const { estado } = useSelector((state) => {
    return state.menuRRHH;
  });

  console.log(estado);

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
    {
      label: 'Solicitudes',
      items: [
        {
          label: 'Solicitud de dinero',
          icon: 'pi pi-fw pi-eye',
          to: '/solicitud-dinero',
          command: () => {
            navigate('/solicitud-dinero');
          },
        },
        {
          label: 'Rendición de Gastos',
          icon: 'pi pi-fw pi-eye',
          to: '/rendicion-gastos',
          command: () => {
            navigate('/rendicion-gastos');
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
          to: '/registro-actividad',
          command: () => {
            navigate('/informe-actividad');
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
          to: '/registro-proyecto',
          command: () => {
            navigate('/registro-proyecto');
          },
        },
        {
          label: 'Registro de Presupuestos',
          icon: 'pi pi-fw pi-eye',
          to: '/registro-presupuesto',
          command: () => {
            navigate('/registro-presupuesto');
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
          to: '/registro-referencia',
          command: () => {
            navigate('/registro-referencia');
          },
        },
        {
          label: 'Registro de Cargos',
          icon: 'pi pi-fw pi-save',
          to: '/registro-cargos',
          command: () => {
            navigate('/registro-cargos');
          },
        },
        {
          label: 'Registro de Documento',
          icon: 'pi pi-fw pi-save',
          to: '/registro-documentos',
          command: () => {
            navigate('/registro-documentos');
          },
        },
        {
          label: 'Lugares Comisión',
          icon: 'pi pi-fw pi-save',
          to: '/lugar-comision',
          command: () => {
            navigate('/lugar-comision');
          },
        },
      ],
    },
  ];

  const menuFyA = [
    {
      label: 'Base de información',
      icon: 'pi pi-fw pi-search',
      items: [
        {
          label: 'Registro de usuario',
          icon: 'pi pi-fw pi-bookmark',
        },
        {
          label: 'Registro de empleado',
          icon: 'pi pi-fw pi-bookmark',
        },
      ],
    },
    {
      label: 'Movimientos',
      icon: 'pi pi-fw pi-search',
      items: [
        {
          label: 'Repositorio de documentos',
          icon: 'pi pi-fw pi-bookmark',
        },
      ],
    },
  ];
  const main = () => {
    return menu
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
      : null;
  };

  const fyaMain = () => {
    return menuFyA
      ? menuFyA.map((item, index) => {
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
      : null;
  };
  return (
    <div className='layout-menu-container eliminar-li'>
      <ul className='layout-menu'>{!estado ? main() : fyaMain()}</ul>
    </div>
  );
}
