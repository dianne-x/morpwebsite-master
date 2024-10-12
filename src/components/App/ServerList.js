import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const initialServers = [
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
    <>
      {servers.map((server) => (
        <TopBarButton key={server.id} icon={server.icon} onClick={() => onServerClick(server)} title={server.name} />
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