import React, { useState, useEffect } from 'react';
import ManageUsersModal from './ManagaeUsersModal';
import ManageServersModal from './ManageServersModal';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [servers, setServers] = useState([]);
    const [isManageUsersModalOpen, setIsManageUsersModalOpen] = useState(false);
    const [isManageServersModalOpen, setIsManageServersModalOpen] = useState(false);

    // Fetch users when the modal is opened
    const fetchUsers = () => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getUsers.php`)
            .then(response => {
                setUsers(response.data || []); // Ensure users is an array
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    // Fetch servers when the modal is opened
    const fetchServers = () => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getServers.php`)
            .then(response => {
                setServers(response.data || []); // Ensure servers is an array
            })
            .catch(error => {
                console.error('Error fetching servers:', error);
            });
    };

    // User Management Functions
    const handleKickUser = (userId) => {
        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/kickUser.php`, { userId })
            .then(response => {
                if (response.data.success) {
                    alert('User has been kicked.');
                } else {
                    alert(`Error kicking user: ${response.data.error}`);
                }
            })
            .catch(error => {
                console.error('Error kicking user:', error);
            });
    };

    const handleTimeoutUser = (userId, duration) => {
        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/timeoutUser.php`, { userId, duration })
            .then(response => {
                if (response.data.success) {
                    alert(`User has been timed out for ${duration} minutes.`);
                } else {
                    alert(`Error timing out user: ${response.data.error}`);
                }
            })
            .catch(error => {
                console.error('Error timing out user:', error);
            });
    };

    const handleBanUser = (userId) => {
        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/banUser.php`, { userId })
            .then(response => {
                if (response.data.success) {
                    alert('User has been banned.');
                } else {
                    alert(`Error banning user: ${response.data.error}`);
                }
            })
            .catch(error => {
                console.error('Error banning user:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/deleteUser.php`, { userId })
            .then(response => {
                if (response.data.success) {
                    alert('User has been deleted.');
                    setUsers(users.filter(user => user.id !== userId)); // Update UI
                } else {
                    alert(`Error deleting user: ${response.data.error}`);
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    // Server Management Functions
    const handleDeleteServer = (serverId) => {
        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/deleteServer.php`, { serverId })
            .then(response => {
                if (response.data.success) {
                    alert('Server has been deleted.');
                    setServers(servers.filter(server => server.id !== serverId)); // Update UI
                } else {
                    alert(`Error deleting server: ${response.data.error}`);
                }
            })
            .catch(error => {
                console.error('Error deleting server:', error);
            });
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <section>
                <h2>Manage Users</h2>
                <button
                    onClick={() => {
                        setIsManageUsersModalOpen(true);
                        fetchUsers(); // Fetch users when the modal is opened
                    }}
                >
                    Manage WebApp Users
                </button>
            </section>
            <section>
                <h2>Manage WebApp Servers</h2>
                <button
                    onClick={() => {
                        setIsManageServersModalOpen(true);
                        fetchServers(); // Fetch servers when the modal is opened
                    }}
                >
                    Manage Servers
                </button>
            </section>
            {isManageUsersModalOpen && (
                <ManageUsersModal
                    users={users}
                    onClose={() => setIsManageUsersModalOpen(false)}
                    onRemoveUser={(userId) => setUsers(users.filter(user => user.id !== userId))}
                    onKickUser={handleKickUser}
                    onTimeoutUser={handleTimeoutUser}
                    onBanUser={handleBanUser}
                    onDeleteUser={handleDeleteUser}
                />
            )}
            {isManageServersModalOpen && (
                <ManageServersModal
                    servers={servers}
                    onClose={() => setIsManageServersModalOpen(false)}
                    onRemoveServer={(serverId) => setServers(servers.filter(server => server.id !== serverId))}
                    onDeleteServer={handleDeleteServer}
                />
            )}
        </div>
    );
};

export default AdminPanel;