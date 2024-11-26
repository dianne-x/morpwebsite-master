import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const ServerList = ({ onServerClick, onCreateServerClick }) => {
  const [servers, setServers] = useState([]);

  var userId = localStorage.getItem('morp-login-user');
  

  useEffect(() => {
    // Fetch the joined servers from the backend
    const fetchJoinedServers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getJoinedServers.php?userId=${userId}`); // Update with your actual API endpoint
        const data = await response.json();
        if (data.success) {
          setServers(data.servers);
        } else {
          console.error('Failed to fetch servers:', data.message);
        }
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    fetchJoinedServers();
  }, []);

  return (
    <>
      {servers.map((server) => (
        <TopBarButton 
          key={server.id} 
          picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.icon})`} 
          onClick={() => onServerClick(server)} 
          title={server.name} />
      ))}
    </>
  );
};

// Prop validation
ServerList.propTypes = {
  onServerClick: PropTypes.func.isRequired,
  onCreateServerClick: PropTypes.func.isRequired,
};

export default ServerList;