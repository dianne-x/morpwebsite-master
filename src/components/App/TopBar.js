import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/TopBar.scss';
import FriendList from './FriendList';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import JoinServerForm from './joinServer';
import TopBarButton from './TopBarButton';
import UserPanel from './userPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAdd, faUser, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons'

const Topbar = ({ onServerClick, LogOut }) => {
  const [isServersSelected, setIsServersSelected] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false); // State for join form
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [profilePicPath, setProfilePicPath] = useState('');
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

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch(`http://localhost/morpwebsite-master/src/php/getProfilePic.php?uid=${localStorage.getItem('morp-login-user')}`);
        const data = await response.json();
        if (data.success) {
          setProfilePicPath(data.profile_pic_path);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
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

  const handleUserPanelOpen = () => {
    setIsUserPanelOpen(true);
  }

  const handleUserPanelClose = () => {
    setIsUserPanelOpen(false);
  }


  return (
    <div className="topbar">
      <div className='home-list'>
        <TopBarButton icon={<FontAwesomeIcon icon={faHome} />} title="Home" onClick={() => onServerClick({ id: 1, name: 'Home' })} />
        <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Add Server" onClick={() => handleFormOpen()} />
        <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Join" onClick={() => handleJoinFormOpen()} />
      </div>

      <div ref={topbarRef} className="icon-list">
        {
          isServersSelected ? 
          <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} /> : 
          <FriendList onFriendClick={() => {}} />
        }
      </div>

      {isFormOpen && <ServerCreationForm onClose={handleFormClose} />}
      {isJoinFormOpen && <JoinServerForm onClose={handleJoinFormClose} />} {/* Render JoinServerForm */}
      {isUserPanelOpen && <UserPanel onClose={handleUserPanelClose} LogOut={LogOut} />}

      <div className='user-list'>
        <TopBarButton 
          icon={<FontAwesomeIcon icon={(isServersSelected ? faCompass : faUsers)} />} 
          title={(isServersSelected ? "Show Friends" : "Show Servers")} 
          onClick={() => setIsServersSelected(!isServersSelected)} 
        />
        <TopBarButton 
          icon={<FontAwesomeIcon icon={faUser} />} 
          title="Profile"  
          onClick={() => handleUserPanelOpen()}
          picPath={`url(http://localhost/morpwebsite-master/src/pictureData/userPictures/${profilePicPath})`}
        />
      </div>
    </div>
  );
};

Topbar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default Topbar;