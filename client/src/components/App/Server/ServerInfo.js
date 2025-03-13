import React, { useState } from 'react';
import '../../../style/App/Server/ServerInfo.scss';
import ServerSettings from './ServerSettings';
import UserInfo from '../User/UserInfo'; // Import the UserInfo component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const ServerInfo = ({ server, users = [], openServerSettings }) => {
    const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user ID

    if (!server) {
        return <div className='server-info server-side'>No server information available.</div>;
    }

    const owners = users.filter(user => user.is_owner == 1);
    const moderators = users.filter(user => user.is_moderator == 1 && user.is_owner != 1);  
    const regularUsers = users.filter(user => user.is_owner != 1 && user.is_moderator != 1);

    return (
        <>
            <div className='server-info server-side'>
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.icon}`} className="server-image" alt="Server Icon"/>
                <h2>{server.name}</h2>
                <div className='server-users'>
                    <h3>Owner:</h3>
                    <ul>
                        {owners.length > 0 ? (
                            owners.map((user, userIndex) => (
                                <li key={userIndex} className="user-item" onClick={() => {setSelectedUserId(user.uid); console.log(user);}}>
                                    {user.name}
                                </li>
                            ))
                        ) : (
                            <span>No owners available</span>
                        )}
                    </ul>
                    <h3>Moderators:</h3>
                    <ul>
                        {moderators.length > 0 ? (
                            moderators.map((user, userIndex) => (
                                <li key={userIndex} className="user-item" onClick={() => {setSelectedUserId(user.uid); console.log(user);}}>
                                    {user.name}
                                </li>
                            ))
                        ) : (
                            <span>No moderators available</span>
                        )}
                    </ul>
                    <h3>Users:</h3>
                    <ul>
                        {regularUsers.length > 0 ? (
                            regularUsers.map((user, userIndex) => (
                                <li key={userIndex} className="user-item" onClick={() => {setSelectedUserId(user.uid); console.log(user);}}>
                                    {user.name}
                                </li>
                            ))
                        ) : (
                            <span>No users available</span>
                        )}
                    </ul>
                </div>
                <div className='settings-content'>
                    <button className='server-settings' onClick={openServerSettings} >
                        <span>
                            <FontAwesomeIcon icon={faCog} />
                        </span>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
            {selectedUserId && (
                <div className="modal-overlay" onClick={() => setSelectedUserId(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <UserInfo userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
                    </div>
                </div>
            )} {/* Show UserInfo modal */}
        </>
    );
};

export default ServerInfo;