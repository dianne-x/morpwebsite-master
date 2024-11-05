import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/TopBar.scss';
import FriendList from './FriendList';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import JoinServerForm from './joinServer';
import TopBarButton from './TopBarButton';
import UserPanel from './userPanel';
import ChannelList from './ChannelList';
import ChatWindow from './ChatWindow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAdd, faUser, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ onServerClick, LogOut }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isServersSelected, setIsServersSelected] = useState(true);
  const [profilePicPath, setProfilePicPath] = useState('');
  const topbarRef = useRef(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        // Fetch profile picture logic here
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
  };

  const handleUserPanelClose = () => {
    setIsUserPanelOpen(false);
  };

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

TopBar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default TopBar;