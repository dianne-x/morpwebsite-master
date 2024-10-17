import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/TopBar.scss';
import FriendList from './FriendList';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import JoinServerForm from './joinServer';
import TopBarButton from './TopBarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAdd, faUser, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons'

const Topbar = ({ onServerClick }) => {
  const [isServersSelected, setIsServersSelected] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false); // State for join form
  const topbarRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (topbarRef.current) {
        topbarRef.current.scrollLeft += event.deltaY;
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

  const handleJoinFormOpen = () => {
    setIsJoinFormOpen(true);
  };

  const handleJoinFormClose = () => {
    setIsJoinFormOpen(false);
  };

  return (
    <div className="topbar">
      <div className='home-list'>
        <TopBarButton icon={<FontAwesomeIcon icon={faHome} />} title="Home" onClick={() => onServerClick({ id: 1, name: 'Home' })} />
        <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Add Server" onClick={() => handleFormOpen()} />
        <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Join" onClick={() => handleJoinFormOpen()} />
      </div>

<<<<<<< HEAD
      
=======
>>>>>>> da59d45381fb40dc6ac060c0e71f71a905d4b2ec
      <div ref={topbarRef} className="icon-list">
        {
          isServersSelected ? 
          <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} /> : 
          <FriendList onFriendClick={() => {}} />
        }
      </div>

      {isFormOpen && <ServerCreationForm onClose={handleFormClose} />}
      {isJoinFormOpen && <JoinServerForm onClose={handleJoinFormClose} />} {/* Render JoinServerForm */}

      <div className='user-list'>
        <TopBarButton 
          icon={<FontAwesomeIcon icon={(isServersSelected ? faCompass : faUsers)} />} 
          title={(isServersSelected ? "Show Friends" : "Show Servers")} 
          onClick={() => setIsServersSelected(!isServersSelected)} 
        />
        <TopBarButton icon={<FontAwesomeIcon icon={faUser} />} title="Profile" />
      </div>
    </div>
  );
};

Topbar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default Topbar;