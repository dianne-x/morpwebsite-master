import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/App/TopBar';
import ChannelList from '../../components/App/ChannelList';
import ChatWindow from '../../components/App/ChatWindow';
import HomePage from '../../components/App/HomePage';
import '../../style/App/AppLayout.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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

  const [selectedServer, setSelectedServer] = useState(null);

  const handleServerClick = (server) => {
    setSelectedServer(server);
  };



  return (
    <HelmetProvider>
      <Helmet>
        <title>MORP - App</title>
      </Helmet>


      <div className='app-container'>
  
        <Topbar onServerClick={handleServerClick} />
        <div className="main-content">
          {selectedServer && selectedServer.id !== 1 ? ( // If a server is selected and it's not Home
            <>
              <ChannelList serverId={selectedServer.id} />
              <ChatWindow serverId={selectedServer.id} />
            </>
          ) : (
            <HomePage /> // Show HomePage if no server or Home is selected
          )}
        </div>
  
        <button style={{color: 'red'}} onClick={() => LogOut()}>Log out</button>
        <Outlet />
      </div>
    </HelmetProvider>
  );
}

export default AppLayout;