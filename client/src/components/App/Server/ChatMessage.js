import React from 'react';
import '../../../style/App/Server/ChatMessage.scss';

const ChatMessage = ({name, message}) => {
    return (
        <div className="chat-message">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/character.png`} alt="Character Avatar" />
            <div className="chat-message-content">
                <h3>{name}</h3>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ChatMessage;