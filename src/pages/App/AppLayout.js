import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='app-container'>
      This will be the app.
      <Outlet />
    </div>
  );
}

export default AppLayout;