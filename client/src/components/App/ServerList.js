import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const ServerList = ({ onServerClick, onCreateServerClick, servers }) => {

  return (
    <>
      {servers.length > 0 ? (
        servers.map((server) => (
        <TopBarButton 
          key={server.id} 
          picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.icon})`} 
          onClick={() => onServerClick(server)} 
          title={server.name} />
      ))
      ) : (
        <p>You have yet to join any servers.</p>
      )}
    </>
  );
};

// Prop validation
ServerList.propTypes = {
  onServerClick: PropTypes.func.isRequired,
  onCreateServerClick: PropTypes.func.isRequired,
};

export default ServerList;