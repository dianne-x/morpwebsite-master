import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/TopBar.scss';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import TopBarButton from './TopBarButton';

const Topbar = ({ onServerClick }) => {
  const topbarRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      if (topbarRef.current) {
        topbarRef.current.scrollLeft += event.deltaY; // Scroll horizontally
        event.preventDefault(); // Prevent default vertical scroll
      }
    };

    const currentRef = topbarRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel); // Cleanup
    };
  }, []);

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="topbar" ref={topbarRef}>
      <div className='home-list'>
        <TopBarButton icon="🏠" title="Home" onClick={() => onServerClick({ id: 1, name: 'Home' })} />
        <TopBarButton icon="+" title="Add Server" onClick={() => handleFormOpen()} />
      </div>
      
      <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} />
      {isFormOpen && <ServerCreationForm onClose={handleFormClose} />}

      <div className='user-list'>
        <TopBarButton icon="🔔" title="Friendo" />
        <TopBarButton icon="👤" title="Profile" />
      </div>
    </div>
  );
};

Topbar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default Topbar;