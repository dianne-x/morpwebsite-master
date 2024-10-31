import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/userPanel.scss'; // Import the SCSS file
import axios from 'axios';

import Profile from './userPanel/Profile';
import Characters from './userPanel/Characters';

const UserPanel = ({ onClose, LogOut }) => {
  const [activeTab, setActiveTab] = useState('Profile');

  




  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="user-panel">
        <div className="sidebar">
          <button onClick={() => setActiveTab('Profile')} className={activeTab == 'Profile' ? 'active' : ''}>Profile</button>
          <button onClick={() => setActiveTab('Characters')} className={activeTab == 'Characters' ? 'active' : ''}>Characters</button>
          <button onClick={() => setActiveTab('Settings')} className={activeTab == 'Settings' ? 'active' : ''}>Settings</button>
        </div>
        <div className="content">
          {activeTab === 'Profile' && (
            <Profile LogOut={LogOut} />
          )}
          {activeTab === 'Characters' && (
            <Characters />
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
};

export default UserPanel;
