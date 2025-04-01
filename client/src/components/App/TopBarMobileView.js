import React, { useState, useRef } from 'react';
import '../../style/App/TopBarMobileView.scss';
import TopBarButton from './TopBarButton';
import ServerList from './ServerList';
import FriendList from './FriendList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAdd, faBars, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons';

const TopBarMobileView = ({ onClose, onFriendClick, onServerClick, profilePicPath, handleFormOpen, handleUserPanelOpen, friends, servers }) => {
    const [isServersSelected, setIsServersSelected] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const topbarRef = useRef(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 450); // Delay to allow animation
    };

    const handleFriendClick = (friend) => {
        onFriendClick(friend);
        handleClose();
    };

    console.log(friends);
    console.log(servers);

    const friendList = <div className='friend-list-mobile'>
        {
            friends.map((friend) => (
                <button
                    key={friend.uid}
                    onClick={() => handleFriendClick(friend)}>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${friend.profile_pic_path}`} alt="Friend" />
                        {friend.name}
                </button>
            ))
        }
    </div>

    const serverList = <div className='server-list-mobile'>
        {
            servers.map((server) => (
                <button
                    key={server.id}
                    onClick={() => { onServerClick(server); handleClose(); }}>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/serverPictures/${server.icon}`} alt="Server" />
                        {server.name}
                </button>
            ))
        }
    </div>
    
    

    return (
        <>
            <div className={`top-bar-mobile-view ${isClosing ? 'closing' : ''}`}>
                <div className='topbar-content'>
                <button className="close-button" onClick={handleClose}>
                    <FontAwesomeIcon icon={faBars} />
                    Close Menu
                </button>
                    <div className='home-list-mobile'>
                        <button
                            title="Home" 
                            onClick={() => { onServerClick({ id: 0, name: 'Home' }); handleClose(); }}>
                            <FontAwesomeIcon icon={faHome} /> 
                            Home
                        </button>
                        <button
                            title="Add Server" 
                            onClick={() => { handleFormOpen(); handleClose() }}>
                            <FontAwesomeIcon icon={faAdd} /> 
                            Servers/Friends
                        </button>
                    </div>
            
                    <div ref={topbarRef} className="icon-list-mobile">
                        {
                            isServersSelected ? 
                            serverList : 
                            friendList
                        }
                    </div>
            
                    <div className='user-list-mobile'>
                        <button
                            title="Show Friends" 
                            onClick={() => { setIsServersSelected(!isServersSelected); }}>
                            <FontAwesomeIcon icon={!isServersSelected ? faCompass : faUsers} />
                        {(isServersSelected ? "Show Friends" : "Show Servers")}
                        </button>
                        
                        <button
                            title="Profile"  
                            onClick={() => { handleUserPanelOpen(); handleClose(); }}>
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${profilePicPath}`} alt="Profile" />
                            <span>Profile</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBarMobileView;