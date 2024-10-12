import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/TopBar.scss';
import FriendList from './FriendList';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import TopBarButton from './TopBarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAdd, faUser, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons'

const Topbar = ({ onServerClick }) => {
  const topbarRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isServersSelected, setIsServersSelected] = useState(true);

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
        <TopBarButton icon={<FontAwesomeIcon icon={faHome} />} title="Home" onClick={() => onServerClick({ id: 1, name: 'Home' })} />
        <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Add Server" onClick={() => handleFormOpen()} />
      </div>
      
      {isServersSelected ? 
        <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} />
         : 
        <FriendList onFriendClick={() => {}} />
      }
        
      
      {isFormOpen && <ServerCreationForm onClose={handleFormClose} />}

      <div className='user-list'>
        <TopBarButton icon={<FontAwesomeIcon icon={(isServersSelected ? faCompass : faUsers)} />} title="Friend" onClick={() => setIsServersSelected(!isServersSelected)} />
        <TopBarButton icon={<FontAwesomeIcon icon={faUser} />} title="Profile" />
      </div>
    </div>
  );
};

Topbar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default Topbar;