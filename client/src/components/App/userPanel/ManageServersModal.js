import React, { useState, useEffect } from 'react';
import '../../../style/App/userPanel/servermodal.scss';
import axios from 'axios';

const ManageServersModal = ({ onClose }) => {
  const [servers, setServers] = useState([]); // State to store the list of servers

  // Function to fetch the list of servers from the backend
  const fetchServers = () => {
    axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getServersManage.php`)
      .then(response => {
        //console.log('Raw response:', response); // Log the raw response
        if (response.data.success) {
          setServers(response.data.servers); // Update the servers state with the fetched data
        } else {
          console.error('Error fetching servers:', response.data.error || 'Unknown error');
        }
      })
      .catch(error => {
        console.error('Error fetching servers:', error.message || 'Unknown error');
      });
  };

  // Function to handle deleting a server
  const handleDeleteServer = (serverId) => {
    //console.log(`Attempting to delete server with ID: ${serverId}`);
    axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/deleteServer.php`, { serverId })
      .then(response => {
        if (response.data.success) {
          alert('Server has been deleted.');
          fetchServers(); // Refresh the server list after deletion
        } else {
          alert(`Error deleting server: ${response.data.error || 'Unknown error'}`);
        }
      })
      .catch(error => {
        console.error('Error deleting server:', error.message || 'Unknown error');
      });
  };

  // Fetch servers when the component mounts
  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 style={{ color: 'black' }}>Manage WebApp Servers</h2>
        <button onClick={onClose} style={{ color: 'black' }}>Close</button>
        <ul>
          {servers.map(server => (
            <li key={server.id} style={{ color: 'black', marginBottom: '10px' }}>
              <div className="server-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{server.server_name}</span>
                <button
                  onClick={() => handleDeleteServer(server.id)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageServersModal;