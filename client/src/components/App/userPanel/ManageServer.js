import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/userPanel/ManageServer.scss';

const ManageServer = ({ serverTrigger }) => { // Destructure serverTrigger from props
    const [servers, setServers] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const uid = JSON.parse(localStorage.getItem('morp-login-user'));
        setUserId(uid);
        fetchServers(uid);
    }, []);

    const fetchServers = async (uid) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/manage_servers.php?uid=${uid}`);
            setServers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching servers:', error);
            setServers([]);
        }
    };

    const handleInputChange = (e, serverId) => {
        const { name, value } = e.target;
        setServers(servers.map(server =>
            server.id === serverId ? { ...server, [name]: value } : server
        ));
    };

    const handleFileChange = (e, serverId) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setServers(servers.map(server =>
                    server.id === serverId ? { ...server, tempPicture: reader.result, server_picture_file: file } : server
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (serverId) => {
        // eslint-disable-next-line no-restricted-globals
        if (!window.confirm('Are you sure you want to save changes?')) {
            return;
        }

        const server = servers.find(s => s.id === serverId);

        // Validate UID
        const sanitizedUid = (server.uid || '').toLowerCase().replace(/\s+/g, '');
        if (sanitizedUid !== server.uid) {
            alert('UID must be lowercase and contain no spaces.');
            return;
        }

        const formData = new FormData();
        if (server.server_picture_file) {
            formData.append('server_picture', server.server_picture_file);
        }
        formData.append('id', serverId);
        formData.append('server_name', server.server_name || '');
        formData.append('uid', sanitizedUid);

        try {
            const response = await axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/manage_servers.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                alert('Server data saved successfully.');
                serverTrigger();
            } else {
                alert(response.data.error || 'An error occurred while saving server data.');
            }
            fetchServers(userId);
        } catch (error) {
            console.error('Error saving server data:', error);
            alert('An error occurred while saving server data.');
        }
    };

    const handleDelete = async (serverId) => {
        // eslint-disable-next-line no-restricted-globals
        if (!window.confirm('Are you sure you want to delete this server?')) {
            return;
        }

        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_PHP_BASE_URL}/manage_servers.php`,
                data: { id: serverId },
                headers: { 'Content-Type': 'application/json' }
            });
            setServers(servers.filter(server => server.id !== serverId));
            alert('Server deleted successfully.');
            serverTrigger();
        } catch (error) {
            console.error('Error deleting server:', error);
            alert('An error occurred while deleting the server.');
        }
    };

    return (
        <div className='manage-server-panel'>
            <h1>Manage Servers</h1>
            {Array.isArray(servers) && servers.length > 0 ? (
                servers.map(server => (
                    <form key={server.id} onSubmit={(e) => { e.preventDefault(); handleSave(server.id); }}>
                        <label
                            className='server-picture-label'
                            htmlFor={`server_pic_${server.id}`}
                            style={{
                                backgroundImage: `url(${server.tempPicture || `${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.server_picture_path}`})`
                            }}
                        ></label>
                        <input
                            type="file"
                            id={`server_pic_${server.id}`}
                            onChange={(e) => handleFileChange(e, server.id)}
                        />
                        <div className='input-wrapper'>
                            <label>
                                Server Name
                            </label>
                            <input
                                type="text"
                                name="server_name"
                                value={server.server_name || ''}
                                onChange={(e) => handleInputChange(e, server.id)}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label>
                                UID
                            </label>
                            <input
                                type="text"
                                name="uid"
                                value={server.uid || ''}
                                onChange={(e) => handleInputChange(e, server.id)}
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => handleDelete(server.id)} className="server-delete-btn">Delete</button>
                    </form>
                ))
            ) : (
                <p>No servers found.</p>
            )}
        </div>
    );
};

export default ManageServer;
