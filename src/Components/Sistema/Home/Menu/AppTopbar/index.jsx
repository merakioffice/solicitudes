import React from 'react';
import { Link } from 'react-router-dom';

export default function AppTopbar() {
  return (
    <div className='layout-topbar '>
      <Link to='/Dashboard' className='layout-topbar-logo'>
        <span>Gestión de rendiciones</span>
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
      <ul
        className='layout-topbar-menu lg:flex origin-top'
        // className={
        //   //classNames("layout-topbar-menu lg:flex origin-top", {
        //   "layout-topbar-menu-mobile-active"
        //   //: props.mobileTopbarMenuActive,
        //   // })
        // }
      >
        <li>
          <button
            className='p-link layout-topbar-button'
            //  onClick={props.onMobileSubTopbarMenuClick}
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
