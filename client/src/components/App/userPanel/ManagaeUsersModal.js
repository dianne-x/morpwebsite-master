import React from 'react';
import '../../../style/App/userPanel/modal.scss';
import axios from 'axios';
import { getWebSocket } from '../../../utils/websocket';

const ManageUsersModal = ({ users, onClose, onRemoveUser }) => {
  // Function to handle kicking a user
  const handleKickUser = (userId) => {
    const ws = getWebSocket();
    console.log('WebSocket:', ws);
    console.log(`Attempting to kick user with ID: ${userId}`);
    // Send the "kick" action via WebSocket
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'kick', userId }));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  // Function to handle timing out a user
  const handleTimeoutUser = (userId, duration) => {
    console.log(`Attempting to timeout user with ID: ${userId} for ${duration} minutes`);
    axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/timeoutUser.php`, { userId, duration })
      .then(response => {
        if (response.data.success) {
          alert(`User has been timed out for ${duration} minutes.`);
  
          // Kick the user via WebSocket
          const ws = getWebSocket();
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: 'kick', userId }));
          } else {
            console.error('WebSocket is not open. Cannot send kick message.');
          }
        } else {
          alert(`Error timing out user: ${response.data.error}`);
        }
      })
      .catch(error => {
        console.error('Error timing out user:', error);
      });
  };

  // Function to handle banning a user
  const handleBanUser = (userId) => {
    console.log(`Attempting to ban user with ID: ${userId}`);
    axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/banUser.php`, { userId })
      .then(response => {
        if (response.data.success) {
          alert('User has been banned.');

          // Kick the user via WebSocket
          handleKickUser(userId);
          
        } else {
          alert(`Error banning user: ${response.data.error}`);
        }
      })
      .catch(error => {
        console.error('Error banning user:', error);
      });
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    console.log(`Attempting to delete user with ID: ${userId}`);
    axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/deleteUser.php`, { userId })
      .then(response => {
        if (response.data.success) {
          alert('User has been deleted.');
          onRemoveUser(userId); // Remove the user from the UI

          // Kick the user via WebSocket
          handleKickUser(userId);
        } else {
          alert(`Error deleting user: ${response.data.error}`);
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Manage WebApp Users</h2>
        <button onClick={onClose}>Close</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <div className="user-info">
                <span>{user.name}</span>
                {user.isBanned && <span className="banned-label">Banned</span>}
              </div>
              <div className="user-actions">
                <button onClick={() => handleKickUser(user.id)}>Kick</button>
                <button onClick={() => handleTimeoutUser(user.id, 10)}>Timeout 10m</button>
                <button onClick={() => handleTimeoutUser(user.id, 60)}>Timeout 1h</button>
                <button onClick={() => handleBanUser(user.id)}>Ban</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsersModal;