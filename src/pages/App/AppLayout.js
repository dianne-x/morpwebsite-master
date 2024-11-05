import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from '../../components/App/TopBar';
import ChannelList from '../../components/App/ChannelList';
import ChatWindow from '../../components/App/ChatWindow';
import HomePage from '../../components/App/HomePage';
import '../../style/App/AppLayout.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AppLayout = () => {
  const [loggedIn, setLoggedIn] = useState(checkLogin());
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState(null);
  const [sections, setSections] = useState([]);

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

  const handleServerClick = (server) => {
    if (server.id === 1) {
      setSelectedServer(null);
      setSections([]);
    } else {
      setSelectedServer(server);
      fetchSectionsAndRooms(server.id);
    }
  };

  const fetchSectionsAndRooms = (serverId) => {
    fetch(`http://localhost/morpwebsite-master-1/src/php/getSectionsandRooms.php?server_id=${serverId}`)
      .then(response => response.json())
      .then(data => setSections(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>MORP - App</title>
      </Helmet>

      <div className='app-container'>
        <Topbar onServerClick={handleServerClick} LogOut={LogOut} />
        
        {selectedServer ? (
          <div className="main-content">
            <ChannelList sections={sections} />
            <ChatWindow serverId={selectedServer.id} />
          </div>
        ) : (
          <HomePage />
        )}

        <Outlet />
      </div>
    </HelmetProvider>
  );
};

export default AppLayout;