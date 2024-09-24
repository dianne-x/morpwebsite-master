import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../style/App.scss';

const Layout = () => {
  return (
    <div className='app'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;