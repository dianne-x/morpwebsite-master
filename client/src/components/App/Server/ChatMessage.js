import React, { useState } from 'react';
import '../../../style/App/Server/ChatMessage.scss';

const ChatMessage = ({ name, message, date, showIconAndName }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    };

    return (
        <div className="chat-message" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className='chat-message-icon'>
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
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;