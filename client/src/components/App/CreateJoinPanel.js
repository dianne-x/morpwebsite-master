import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import JoinServerForm from './joinServer';
import ServerCreationForm from './createServerForm';
import AddFriend from './addFriend';


const CreateJoinPanel = ({onClose}) => {
    const [activeTab, setActiveTab] = useState('CreateServer');

    return (
        <>
        <div className="overlay" onClick={onClose}></div>
        <div className="user-panel">
            <div className="sidebar">

            <button onClick={() => setActiveTab('CreateServer')} className={activeTab == 'CreateServer' ? 'active' : ''}>
                <span>Create Server</span>
            </button>

            <button onClick={() => setActiveTab('JoinServer')} className={activeTab == 'JoinServer' ? 'active' : ''}>
                <span>Join Server</span>
            </button>

            <button onClick={() => setActiveTab('AddFriend')} className={activeTab == 'AddFriend' ? 'active' : ''}>
                <span>Add Friend</span>
            </button>
            
            </div>
            <div className="server-content">
                {activeTab === 'CreateServer' && (
                    <ServerCreationForm />
                )}
                {activeTab === 'JoinServer' && (
                    <JoinServerForm />
                )}
                {activeTab === 'AddFriend' && (
                    <AddFriend />
                )}
            </div>
            <button className="close" onClick={onClose}>&times;</button>
        </div>
        </>
    );
};

CreateJoinPanel.propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  

export default CreateJoinPanel;