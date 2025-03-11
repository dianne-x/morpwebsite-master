import React, { useState } from 'react';
import '../../../style/App/Server/ChatMessage.scss';
import CharacterInfo from '../Character/CharacterInfo'; // Import the CharacterInfo component

const ChatMessage = ({ name, message, date, showIconAndName, characterId, character_pic_path }) => {
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

    const formatMessage = (message) => {
        let formattedMessage = message;
        formattedMessage = formattedMessage.replace(/\*\*\*(.*?)\*\*\*/g, '<span style="font-style: italic; font-weight: bold;">$1</span>');
        formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>');
        formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, '<span style="font-style: italic;">$1</span>');
        formattedMessage = formattedMessage.replace(/!spl\((.*?)\)/g, '<span class="spoiler-span" onclick="if (!this.classList.contains(\'shown\')) this.classList.add(\'shown\')">$1</span>');
        return formattedMessage;
    };

    return (
        <>
            <div className="chat-message" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className='chat-message-icon'> {/* Show CharacterInfo on click */}
                    {showIconAndName && <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${characterId != null ? character_pic_path : "deleted.png"}`} alt="Character Avatar" onClick={() => setShowCharacterInfo(true)}/>}
                </div>
                <div className="chat-message-content">
                    {
                    showIconAndName 
                    && 
                    <div className='chat-message-head'>
                        <h3 onClick={() => setShowCharacterInfo(true)} style={{color: characterId == null ? 'rgb(206, 32, 41)' : ''}}>
                            {characterId != null ? name : "[Deleted Character]"}
                        </h3>
                        <span className='date'>{formatDate(date)}</span>
                    </div>
                    }
                    <p>
                        <span dangerouslySetInnerHTML={{ __html: formatMessage(message) }} /> 
                        {
                        !showIconAndName && 
                        <span className={`date ${isHovered ? 'visible' : 'hidden'}`}>
                            {formatDate(date)}
                        </span>
                        }
                    </p>
                </div>
            </div>
            {showCharacterInfo && characterId != null && (
                <div className="modal-overlay" onClick={() => setShowCharacterInfo(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CharacterInfo characterId={characterId} onClose={() => setShowCharacterInfo(false)} name={name} picture={character_pic_path} />
                    </div>
                </div>
            )} {/* Show CharacterInfo modal */}
        </>
    );
};

export default ChatMessage;