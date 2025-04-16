import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from '../../components/App/TopBar';
import Server from '../../components/App/Server/Server';
import HomePage from '../../components/App/HomePage';
import '../../style/App/AppLayout.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AppLayout = () => {
  const [loggedIn, setLoggedIn] = useState(checkLogin());
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState(null);
  const [sections, setSections] = useState([]);
  const [users, setUsers] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [reloadRolesTrigger, setReloadRolesTrigger] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (selectedServer) {
      fetchSectionsAndRooms(selectedServer.id);
      fetchJoinedUserForServer(selectedServer.id);
    }
  }, [selectedServer, reloadTrigger]);

  useEffect(() => {
    if (selectedServer) {
      fetchJoinedUserForServer(selectedServer.id);
    }
  }, [reloadRolesTrigger]);

  function checkLogin() {
    return localStorage.getItem('morp-login-user') !== null && localStorage.getItem('morp-login-admin') !== 'undefined';
  }

  function LogOut() {
    localStorage.removeItem('morp-login-user');
    setLoggedIn(false);
  }

  const handleServerClick = (server) => {
    if (server.id === 0) {
      setSelectedServer(null);
      setSections([]);
      setUsers([]);
    } else {
      setSelectedServer(server);
      fetchSectionsAndRooms(server.id);
      fetchJoinedUserForServer(server.id);
    }
  };

  const fetchSectionsAndRooms = (serverId) => {
    fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getSectionsandRooms.php?server_id=${serverId}`)
      .then(response => response.json())
      .then(data => setSections(data))
      .catch(error => console.error('Error:', error));
  };


  const fetchJoinedUserForServer = (serverId) => {
    fetch(`${process.env.REACT_APP_PHP_BASE_URL}/serverInfoUsers.php?server_id=${serverId}`)
      .then(response => response.json())
      .then(data => {
        //console.log("Fetched users:", data); // Log fetched users
        setUsers(data);
      })
      .catch(error => console.error('Error:', error));
  }


  return (
    <HelmetProvider>
      <Helmet>
        <title>MORP - App</title>
      </Helmet>

      <div className='app-container'>
        <Topbar onServerClick={handleServerClick} LogOut={LogOut} />
        
        {selectedServer ? (
          <Server selectedServer={selectedServer} sections={sections} users={users} onReload={() => setReloadTrigger(!reloadTrigger)} onRoleReload={() => setReloadRolesTrigger(!reloadRolesTrigger)} />
        ) : (
          <HomePage />
        )}

        <Outlet />
      </div>
    </HelmetProvider>
  );
};

export default AppLayout;