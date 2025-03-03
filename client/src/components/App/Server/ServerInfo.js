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

    return (
        <>
            <div className='server-info server-side'>
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.icon}`} className="server-image" alt="Server Icon"/>
                <h2>{server.name}</h2>
                <h3>Users:</h3>
                <ul>
                    {users.length > 0 ? (
                        users.map((user, userIndex) => (
                            <li key={userIndex} className="user-item" onClick={() => {setSelectedUserId(user.uid); console.log(user);}
                            }>
                                {user.name}
                            </li>
                        ))
                    ) : (
                        <li>No users available</li>
                    )}
                </ul>
                <button className='server-settings' onClick={openServerSettings} >
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                </button>
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