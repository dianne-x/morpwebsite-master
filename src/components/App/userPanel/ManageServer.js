import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageServer = () => {
    const [servers, setServers] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const uid = JSON.parse(localStorage.getItem('morp-login-user')); // Parse the user ID from localStorage
        console.log(`manageserver uid: ${uid}`);
        setUserId(uid);
        fetchServers(uid);
    }, []);

    const fetchServers = async (uid) => {
        try {
            const response = await axios.get(`http://localhost/morpwebsite-master/src/php/manage_servers.php?uid=${uid}`);
            console.log('Fetched servers:', response.data); // Debugging line
            setServers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching servers:', error);
            setServers([]); // Ensure servers is an array even on error
        }
    };

    const handleDelete = async (serverId) => {
        try {
            await axios({
                method: 'DELETE',
                url: 'http://localhost/morpwebsite-master/src/php/manage_servers.php',
                data: { id: serverId },
                headers: { 'Content-Type': 'application/json' } // Ensure the correct headers are set
            });
            setServers(servers.filter(server => server.id !== serverId));
        } catch (error) {
            console.error('Error deleting server:', error);
        }
    };

    const handleNameChange = async (serverId, newName) => {
        try {
            await axios({
                method: 'PUT',
                url: 'http://localhost/morpwebsite-master/src/php/manage_servers.php',
                data: { id: serverId, name: newName }
            });
            setServers(servers.map(server => 
                server.id === serverId ? { ...server, server_name: newName } : server
            ));
        } catch (error) {
            console.error('Error changing server name:', error);
        }
    };

    const handleUidChange = async (serverId, newUid) => {
        try {
            await axios({
                method: 'PUT',
                url: 'http://localhost/morpwebsite-master/src/php/manage_servers.php',
                data: { id: serverId, uid: newUid }
            });
            setServers(servers.map(server => 
                server.id === serverId ? { ...server, uid: newUid } : server
            ));
        } catch (error) {
            console.error('Error changing server UID:', error);
        }
    };

    const handlePicChange = async (serverId, newPicPath) => {
        try {
            await axios({
                method: 'PUT',
                url: 'http://localhost/morpwebsite-master/src/php/manage_servers.php',
                data: { id: serverId, server_picture_path: newPicPath }
            });
            setServers(servers.map(server => 
                server.id === serverId ? { ...server, server_picture_path: newPicPath } : server
            ));
        } catch (error) {
            console.error('Error changing server picture:', error);
        }
    };

    return (
        <div>
            <h1>Manage Servers</h1>
            {Array.isArray(servers) && servers.length > 0 ? (
                servers.map(server => (
                    <div key={server.id}>
                        <h2>{server.name}</h2>
                        <button onClick={() => handleDelete(server.id)}>Delete</button>
                        <button onClick={() => handleNameChange(server.id, prompt('Enter new name:'))}>Change Name</button>
                        <button onClick={() => handleUidChange(server.id, prompt('Enter new UID:'))}>Change UID</button>
                        <button onClick={() => handlePicChange(server.id, prompt('Enter new picture path:'))}>Change Picture</button>
                        <ServerInfo serverId={server.id} />
                    </div>
                ))
            ) : (
                <p>No servers found.</p>
            )}
        </div>
    );
};

const fetchServerInfo = async (serverId) => {
    try {
        const response = await axios.get(`http://localhost/morpwebsite-master/src/php/manage_servers.php?id=${serverId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching server info:', error);
        return null;
    }
};

const ServerInfo = ({ serverId }) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await fetchServerInfo(serverId);
            setInfo(data);
        };
        fetchInfo();
    }, [serverId]);

    return (
        <div>
            {info ? (
                <div>
                    <p>Server Name: {info.server_name}</p>
                    <p>UID: {info.uid}</p>
                    <p>Main Color: {info.main_color}</p>
                    <p>Text Color: {info.text_color}</p>
                    <p>Picture Path: {info.server_picture_path}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>Loading server info...</p>
            )}
        </div>
    );
};

export default ManageServer;
