import React, { useState } from 'react';
import '../../../style/App/Server/ServerInfo.scss';
import ServerSettings from './ServerSettings';
import UserInfo from '../User/UserInfo'; // Import the UserInfo component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCopy, faArrowRightFromBracket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ServerInfo = ({ server, owners = [], moderators = [], regularUsers = [], openServerSettings, isModerator, setSelectedUserId, closeServerInfo, serverInfoOpen }) => {

    if (!server) {
        return <div className='server-info server-side'>No server information available.</div>;
    }
    
    
    const getInviteLink = () => {
        const link = server.invite_link;
        console.log(link);
        
        navigator.clipboard.writeText(link);
        alert('Invite link copied to clipboard!');
    }

    const leaveServer = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to leave the server?`)) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/kickUserFromServer.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: JSON.parse(localStorage.getItem('morp-login-user'))
                })
            });
            const data = await response.json();
            console.log(data);

            window.location.reload();
        } catch (error) {
            console.error('Error kicking user:', error);
        }
    }

    return (
        <>
            <div className={`server-info server-side ${serverInfoOpen ? 'open' : ''}`}>
                <button className='close-server-info' onClick={closeServerInfo}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
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
                    {isModerator &&
                    <>
                            <button className='server-settings' onClick={openServerSettings} >
                                <span>
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                                <span>Settings</span>
                            </button>

                            <button className='server-invite-link' onClick={getInviteLink} title='Copy Invite Link'>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                    </>
                    }
                    <button className='server-invite-link' title='Leave server' onClick={leaveServer}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </button>
                </div>
            </div>
             {/* Show UserInfo modal */}
        </>
    );
};

export default ServerInfo;