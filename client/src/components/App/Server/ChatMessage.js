import React, { useState } from 'react';
import '../../../style/App/Server/ChatMessage.scss';

const ChatMessage = ({ name, message, date, showIconAndName, characterId, character_pic_path, onCharacterClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
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
        if (!message) return message; // Only format if there is some text
        let formattedMessage = message;
        formattedMessage = formattedMessage.replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-style: italic; font-weight: bold;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-weight: bold;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-style: italic;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/!spl\((.*?)\)/g, (match, p1) => p1.trim() != "" ? `<span class="spoiler-span" onclick="if (!this.classList.contains('shown')) this.classList.add('shown')">${p1}</span>` : match);
        return formattedMessage.trim();
    };

    return (
        formatMessage(message) === "" ? <></> : // If message is empty, return null
        <>
            <div className="chat-message" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className='chat-message-icon'>
                    {showIconAndName && (
                        <img 
                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${characterId != null ? character_pic_path : "deleted.png"}`} 
                            alt="Character Avatar" 
                            onClick={() => onCharacterClick(characterId, name, character_pic_path)} 
                        />
                    )}
                </div>
                <div className="chat-message-content">
                    {
                    showIconAndName 
                    && 
                    <div className='chat-message-head'>
                        <h3 
                            onClick={() => onCharacterClick(characterId, name, character_pic_path)} 
                            style={{color: characterId == null ? 'rgb(206, 32, 41)' : ''}}
                        >
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
        </>
    );
};

export default ChatMessage;