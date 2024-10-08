import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/TopBar.scss';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component

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
      <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} />
      {isFormOpen && <ServerCreationForm onClose={handleFormClose} />}
    </div>
  );
};

Topbar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default Topbar;