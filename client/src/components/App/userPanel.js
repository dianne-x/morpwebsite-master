import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/userPanel.scss'; // Import the SCSS file
import axios from 'axios';

import Profile from './userPanel/Profile';
import Characters from './userPanel/Characters';
import Inventory from './userPanel/Inventory';
import ManageServer from './userPanel/ManageServer';
import AdminPanel from './userPanel/adminPanel';
import FriendRequests from './userPanel/friendRequests';

const UserPanel = ({ onClose, LogOut, friendTrigger }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem('morp-login-user'));
    axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/checkAdmin.php?uid=${uid}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="user-panel">
        <div className="sidebar">

          <button onClick={() => setActiveTab('Profile')} className={activeTab == 'Profile' ? 'active' : ''}>
            <span>Profile</span>
          </button>

          <button onClick={() => setActiveTab('Characters')} className={activeTab == 'Characters' ? 'active' : ''}>
            <span>Characters</span>
          </button>

          <button onClick={() => setActiveTab('FriendRequests')} className={activeTab == 'FriendRequests' ? 'active' : ''}>
            <span>Friend Requests</span>
          </button>
          {/*
          <button onClick={() => setActiveTab('Inventory')} className={activeTab == 'Inventory' ? 'active' : ''}>
            <span>Inventory</span>
          </button>
          */}
          <button onClick={() => setActiveTab('ManageServer')} className={activeTab == 'ManageServer' ? 'active' : ''}>
            <span>Manage Server</span>
          </button>

          {user && user.is_admin == 1 && (
            <button onClick={() => setActiveTab('AdminPanel')} className={activeTab == 'AdminPanel' ? 'active' : ''}>
              <span>Admin Panel</span>
            </button>
          )}

          {/*<button onClick={() => setActiveTab('Settings')} className={activeTab == 'Settings' ? 'active' : ''}>
            <span>Settings</span>
          </button>*/}
          
        </div>
        <div className="content user-content">
          {activeTab === 'Profile' && (
            <Profile LogOut={LogOut} />
          )}
          {activeTab === 'Characters' && (
            <Characters />
          )}
          {activeTab === 'FriendRequests' && (
            <FriendRequests friendTrigger={friendTrigger} />
          )}
          {activeTab === 'Inventory' && (
            <Inventory />
          )}
          {activeTab === 'ManageServer' && (
            <ManageServer />
          )}
          {activeTab === 'AdminPanel' && (
            <AdminPanel />
          )}
          {activeTab === 'Settings' && (
            <div>
              <h2>Settings</h2>
              {/* Add settings content */}
            </div>
          )}
        </div>
        <button className="close" onClick={onClose}>&times;</button>
      </div>
    </>
  );
};

UserPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
  LogOut: PropTypes.func.isRequired,
};

export default UserPanel;
