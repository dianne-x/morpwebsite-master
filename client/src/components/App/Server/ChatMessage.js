import React, { useState } from 'react';
import '../../../style/App/Server/ChatMessage.scss';
import CharacterInfo from '../Character/CharacterInfo'; // Import the CharacterInfo component

const ChatMessage = ({ name, message, date, showIconAndName, characterId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showCharacterInfo, setShowCharacterInfo] = useState(false); // State to track if CharacterInfo should be shown
  
    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, options).format(new Date(dateString));
    };

    return (
        <>
            <div className="chat-message" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className='chat-message-icon' onClick={() => setShowCharacterInfo(true)}> {/* Show CharacterInfo on click */}
                    {showIconAndName && <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/character.png`} alt="Character Avatar" />}
                </div>
                <div className="chat-message-content">
                    {
                    showIconAndName 
                    && 
                    <div className='chat-message-head'>
                        <h3>{name}</h3><span className='date'>{formatDate(date)}</span>
                    </div>
                    }
                    <p>{message} {!showIconAndName && <span className={`date ${isHovered ? 'visible' : 'hidden'}`}>{formatDate(date)}</span>}</p>
                </div>
            </div>
            {showCharacterInfo && (
                <div className="modal-overlay" onClick={() => setShowCharacterInfo(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CharacterInfo characterId={characterId} onClose={() => setShowCharacterInfo(false)} />
                    </div>
                </div>
            )} {/* Show CharacterInfo modal */}
        </>
    );
};

export default ChatMessage;