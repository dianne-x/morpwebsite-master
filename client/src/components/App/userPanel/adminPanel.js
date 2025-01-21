import React, { useState } from 'react';
import ManageUsersModal from './ManagaeUsersModal';
import ManageServersModal from './ManageServersModal';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [servers, setServers] = useState([]);
    const [isManageUsersModalOpen, setIsManageUsersModalOpen] = useState(false);
    const [isManageServersModalOpen, setIsManageServersModalOpen] = useState(false);


    //User Manage Functions
    const handleManageUser = () => {
        setIsManageUsersModalOpen(true);
    };

    const handleCloseManageUsersModal = () => {
        setIsManageUsersModalOpen(false);
    }

    const handleRemoveUser = (userId) => {
        // Logic to remove a user
    };


    //Server Manage Functions 🐱‍👤🐱‍👤
    const handleManageServer = () => {
        setIsManageServersModalOpen(true);
    };

    const handleCloseManageServersModal = () => {
        setIsManageServersModalOpen(false);
        }

    const handleRemoveServer = (serverId) => {
        // Logic to remove a server
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <section>
                <h2>Manage Users</h2>
                <button onClick={handleManageUser}>Manage WebApp Users</button>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name}
                            <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Manage WebApp Servers</h2>
                <button onClick={handleManageServer}>Add Server</button>
                <ul>
                    {servers.map(server => (
                        <li key={server.id}>
                            {server.name}
                            <button onClick={() => handleRemoveServer(server.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </section>
            {isManageUsersModalOpen && (
                <ManageUsersModal
                users={users}
                onClose={handleCloseManageUsersModal}
                onRemoveUser={handleRemoveUser}
                />
        
            )}


            {isManageServersModalOpen && (
                <ManageServersModal
                servers={servers}
                onClose={handleCloseManageServersModal}
                onRemoveServer={handleRemoveServer}
                />
            )}
        </div>
    );
};

export default AdminPanel;
