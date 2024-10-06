import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppLayout = () => {

  const [loggedIn, setLoggedIn] = useState(checkLogin());
  const navigate = useNavigate();

  useEffect(() => {
      if (!loggedIn) {
          navigate('/login');
      }
  }, [loggedIn]);

  function checkLogin() {
    return localStorage.getItem('morp-login-user') !== null && localStorage.getItem('morp-login-admin') !== 'undefined';
  }

  function LogOut() {
    localStorage.removeItem('morp-login-user');
    setLoggedIn(false);
  }



  return (
    <div className='app-container'>
      This will be the app.
      <button style={{color: 'red'}} onClick={() => LogOut()}>Log out</button>
      <Outlet />
    </div>
  );
}

export default AppLayout;