import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialServers = [
  { id: 1, icon: '🏠', name: 'Home' }, // Home icon
  { id: 2, icon: '➕', name: 'Create Server' }, // Create server icon
  { id: 3, icon: '🌍', name: 'Earth' },
  { id: 4, icon: '🚀', name: 'Rocket' },
  { id: 5, icon: '🛰️', name: 'Satellite' },
  { id: 6, icon: '🌕', name: 'Moon' },
  { id: 7, icon: '🔥', name: 'Fire' },
  { id: 8, icon: '🪐', name: 'Planet' },
  { id: 9, icon: '👾', name: 'Alien' },
  { id: 10, icon: '🛸', name: 'UFO' },
  { id: 11, icon: '🌌', name: 'Galaxy' },
];

const ServerList = ({ onServerClick, onCreateServerClick }) => {
  const [servers, setServers] = useState(initialServers);

  return (
    <div className="server-list">
      {servers.map((server) => (
        <div
          key={server.id}
          className="server-icon"
          onClick={() => {
            if (server.id === 1) {
              onServerClick(server); // Home icon click
            } else if (server.id === 2) {
              onCreateServerClick(); // Create server icon click
            } else {
              onServerClick(server); // Other server icons click
            }
          }}
          title={server.name} // Tooltip with server name
        >
          {server.icon}
        </div>
      ))}
    </div>
  );
};

// Prop validation
ServerList.propTypes = {
  onServerClick: PropTypes.func.isRequired,
  onCreateServerClick: PropTypes.func.isRequired,
};

export default ServerList;