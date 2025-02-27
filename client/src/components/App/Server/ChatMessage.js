import React from 'react';
import '../../../style/App/Server/ChatMessage.scss';

const ChatMessage = ({name, message, showIconAndName}) => {
    return (
        <div className="chat-message">
            <div className='chat-message-icon' >
                {showIconAndName && <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/character.png`} alt="Character Avatar" />}
            </div>
            <div className="chat-message-content">
                {showIconAndName && <h3>{name}</h3>}
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;