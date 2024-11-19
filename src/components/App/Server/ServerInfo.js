import React from 'react';
import '../../../style/App/Server/ServerInfo.scss';

const ServerInfo = ({ server, users = [] }) => {
    if (!server) {
        return <div className='server-info server-side'>No server information available.</div>;
    }

    return (
        <div className='server-info server-side'>
            <img src={`http://localhost/morpwebsite-master/src/pictureData/serverPictures/${server.icon}`} className="server-image" alt="Server Icon"/>
            <h2>{server.name}</h2>
            <h3>Users:</h3>
            <ul>
                {users.length > 0 ? (
                    users.map((user, userIndex) => (
                        <li key={userIndex} className="user-item">
                            {user.name}
                        </li>
                    ))
                ) : (
                    <li>No users available</li>
                )}
            </ul>
        </div>
    );
};

export default ServerInfo;