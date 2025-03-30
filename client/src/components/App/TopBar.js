import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/TopBar.scss';
import FriendList from './FriendList';
import ServerList from './ServerList';
import ServerCreationForm from './createServerForm'; // Import the form modal component
import JoinServerForm from './joinServer';
import TopBarButton from './TopBarButton';
import UserPanel from './userPanel';
import CreateJoinPanel from './CreateJoinPanel';
import TopBarMobileView from './TopBarMobileView';
import ChannelList from './Server/ChannelList';
import ChatWindow from './Server/ChatWindow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAdd, faUser, faUsers, faCompass, faBars } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ onServerClick, LogOut }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isServersSelected, setIsServersSelected] = useState(true);
  const [isTopbarMobileOpen, setIsTopbarMobileOpen] = useState(false);
  const [profilePicPath, setProfilePicPath] = useState('');
  const topbarRef = useRef(null);

  const [friends, setFriends] = useState([]);
  const [servers, setServers] = useState([]);
  const [serverChangeTrigger, setServerChangeTrigger] = useState(0);
  const [friendChangeTrigger, setFriendChangeTrigger] = useState(0);
  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/viewFriends.php?user_id=${user}`);
        const data = await response.json();
        console.log('Fetched friends:', data);
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [user, friendChangeTrigger]);

  useEffect(() => {
      // Fetch the joined servers from the backend
      const fetchJoinedServers = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getJoinedServers.php?userId=${user}`); // Update with your actual API endpoint
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
    }, [user, serverChangeTrigger]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        // Fetch profile picture logic here
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getProfilePic.php?uid=${localStorage.getItem('morp-login-user')}`);
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
  };

  const handleUserPanelClose = () => {
    setIsUserPanelOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className='home-list'>
          <TopBarButton icon={<FontAwesomeIcon icon={faHome} />} title="Home" onClick={() => onServerClick({ id: 0, name: 'Home' })} />
          <TopBarButton icon={<FontAwesomeIcon icon={faAdd} />} title="Add Server" onClick={() => handleFormOpen()} />
        </div>
  
        <div ref={topbarRef} className="icon-list">
          {
            isServersSelected ? 
            <ServerList onServerClick={onServerClick} onCreateServerClick={handleFormOpen} servers={servers} /> : 
            <FriendList onFriendClick={() => {}} friends={friends} />
          }
        </div>
  
  
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
            picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${profilePicPath})`}
            />
        </div>
  
  
        <button className='open-menu-btn' onClick={() => setIsTopbarMobileOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
          <span>Open Menu</span>
        </button>
      </div>
      {isFormOpen && <CreateJoinPanel onClose={handleFormClose} serverTrigger={() => setServerChangeTrigger(prev => prev + 1)} />}
      {isUserPanelOpen && <UserPanel onClose={handleUserPanelClose} LogOut={LogOut} friendTrigger={() => setFriendChangeTrigger(prev => prev + 1)} />}
      {isTopbarMobileOpen && 
      <TopBarMobileView 
        onClose={() => setIsTopbarMobileOpen(false)}
        profilePicPath={profilePicPath}
        onServerClick={onServerClick}
        handleFormOpen={handleFormOpen}
        handleUserPanelOpen={handleUserPanelOpen} />}
    </>
  );
};

TopBar.propTypes = {
  onServerClick: PropTypes.func.isRequired,
};

export default TopBar;