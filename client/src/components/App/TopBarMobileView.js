import React, { useState, useRef } from 'react';
import '../../style/App/TopBarMobileView.scss';
import TopBarButton from './TopBarButton';
import ServerList from './ServerList';
import FriendList from './FriendList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAdd, faUser, faUsers, faCompass } from '@fortawesome/free-solid-svg-icons';

const TopBarMobileView = ({ onClose, onServerClick, profilePicPath, handleFormOpen, handleUserPanelOpen }) => {
    const [isServersSelected, setIsServersSelected] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const topbarRef = useRef(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 450); // Delay to allow animation
    };

    return (
        <>
            <div className={`top-bar-mobile-view ${isClosing ? 'closing' : ''}`}>
                <button className="close-button" onClick={handleClose}>
                    Close
                </button>
                <div className='topbar-content'>
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
                            <ServerList 
                                onServerClick={(server) => { onServerClick(server); handleClose(); }}  /> : 
                            <FriendList onFriendClick={() => handleClose()} />
                        }
                    </div>
            
                    <div className='user-list-mobile'>
                        <TopBarButton 
                            icon={<FontAwesomeIcon icon={(isServersSelected ? faCompass : faUsers)} />} 
                            title={(isServersSelected ? "Show Friends" : "Show Servers")} 
                            onClick={() => setIsServersSelected(!isServersSelected)} 
                        />
                        <TopBarButton 
                            icon={<FontAwesomeIcon icon={faUser} />} 
                            title="Profile"  
                            onClick={() => { handleUserPanelOpen(); handleClose(); }}
                            picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${profilePicPath})`}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBarMobileView;