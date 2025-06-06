import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChatMessage.scss';
import { convertEmojisToText, emojiMap } from '../../../utils/emojiConverter';

const ChatMessage = ({ name, aliases, message, date, showIconAndName, characterId, character_pic_path, onCharacterClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [loadedAliases, setLoadedAliases] = useState([]);

    useEffect(() => {
        // Load aliases only when the component is mounted or the aliases prop changes
        if (Array.isArray(aliases)) {
            setLoadedAliases(aliases);
        } else {
            setLoadedAliases([]); // Ensure it's an empty array if aliases are not valid
        }
    }, [aliases]);

    const handleSpoilerClick = (event) => {
        if (event.target.matches('.spoiler-span[data-spoiler]')) {
            event.target.classList.add('shown');
        }
    };

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

        // Convert emoji codes back to emojis for display
        let formattedMessage = Object.keys(emojiMap).reduce((msg, emoji) => {
            const code = emojiMap[emoji];
            return msg.replace(new RegExp(code, 'g'), emoji);
        }, message);

        formattedMessage = formattedMessage.replace(/\*\*\*(.*?)\*\*\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-style: italic; font-weight: bold;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-weight: bold;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, (match, p1) => p1.trim() != "" ? `<span style="font-style: italic;">${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/!spl\((.*?)\)/g, (match, p1) => p1.trim() != "" ? `<span class="spoiler-span" data-spoiler>${p1}</span>` : match);
        formattedMessage = formattedMessage.replace(/((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match) => {
            const url = match.startsWith('http') ? match : `http://${match}`;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        });
        return formattedMessage.trim();
    };

    return (
        formatMessage(message) === "" ? <></> : // If message is empty, return null
        <>
            <div className="chat-message" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleSpoilerClick}>
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
                            {characterId != null ? `${name}${loadedAliases.length > 0 ? ` (${loadedAliases.join(' / ')})` : ''}` : "[Deleted Character]"}
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