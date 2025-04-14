import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../../../style/App/Server/ChatWindow.scss';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ChatMessage from './ChatMessage';
import { convertEmojisToText, emojiMap } from '../../../utils/emojiConverter';

const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`); 

const ChatWindow = ({ serverId, roomId, servers = [], roomDetails, onCharacterClick, openServerInfo, openServerRooms, characterChangeTrigger }) => {
  const [selectedServer, setSelectedServer] = useState(serverId);
  const [messages, setMessages] = useState([]);
  const [verifiedCharacters, setVerifiedCharacters] = useState([]);
  const prevCharacterRef = useRef('');
  const chatMessagesRef = useRef(null);
  const [allCharacterAliases, setAllCharacterAliases] = useState({}); // Cache for all character aliases

  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  const handleServerChange = (id) => {
    setSelectedServer(id);
  };

  useEffect(() => {
    handleServerChange(serverId);
  }, [serverId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
        // Convert emoji codes back to emojis for display
        const displayMessage = Object.keys(emojiMap).reduce((msg, emoji) => {
            const code = emojiMap[emoji];
            return msg.replace(new RegExp(code, 'g'), emoji);
        }, data.message);

        setMessages((prevMessages) => [...prevMessages, { ...data, message: displayMessage }]);
    });

    socket.on("previous_messages", (messages) => {
      setMessages(messages);
      
    });

    return () => {
      socket.off("receive_message");
      socket.off("previous_messages");
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit('join_room', roomId);
    }
  }, [roomId]);

  useEffect(() => {
    
      // Fetch aliases for all characters in the room
      const fetchAllCharacterAliases = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getAllCharacterAliases.php?serverId=${serverId}`);
          const data = await response.json();
          console.log('Fetched all character aliases:', data); // Log the fetched data to verify structure
          setAllCharacterAliases(data.aliases); // Cache the aliases
        } catch (error) {
          console.error('Error fetching all character aliases:', error);
        }
      };

      fetchAllCharacterAliases();
  }, [serverId, characterChangeTrigger])

  useEffect(() => {
    // Fetch the verified characters for the selected server
    const fetchVerifiedCharacters = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/useableCharacterForChat.php?serverId=${selectedServer}&userId=${user}`);
        console.log(`fetch url: ${process.env.REACT_APP_PHP_BASE_URL}/useableCharacterForChat.php?serverId=${selectedServer}&userId=${user}`);
        const data = await response.json();
        console.log('Fetched characters:', data); // Log the fetched data to verify structure
        setVerifiedCharacters(data);
      } catch (error) {
        console.error('Error fetching verified characters:', error);
      }
    };

    if (selectedServer) {
      fetchVerifiedCharacters();
    }
  }, [selectedServer, user, characterChangeTrigger]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const convertEmojisInText = (text) => {
    if (!text) return text;
    return Object.keys(emojiMap).reduce((msg, emoji) => {
      const code = emojiMap[emoji];
      return msg.replace(new RegExp(code, 'g'), emoji);
    }, text);
  };

  return (
    <div className="chat-window">
      {roomDetails ? (
        <>
          <div className='room-details-wrapper'>
            <FontAwesomeIcon icon={faBars} className='room-icon' onClick={openServerRooms} />
            <h1>{convertEmojisInText(roomDetails.room_name)}</h1> {/* Convert emojis in room name */}
            <FontAwesomeIcon icon={faInfoCircle} className='room-icon' onClick={openServerInfo}/>
          </div>

          <div className='chat-messages-wrapper'>
            <div className='chat-messages' ref={chatMessagesRef}>
              {messages // Use messages directly instead of precomputedMessages
                .filter((msg) => msg.room_id == roomId) // Filter messages by selected room
                .map((msg, index) => {
                  const showIconAndName = index === 0 || prevCharacterRef.current !== msg.character_id;
                  prevCharacterRef.current = msg.character_id; // Update prevCharacterRef to current msg.character_id

                  return (
                    <div key={index}>
                      <ChatMessage 
                        key={index} 
                        name={msg.character_name} 
                        aliases={allCharacterAliases[msg.character_id] || []} // Pass aliases directly
                        characterId={msg.character_id} 
                        message={msg.message} 
                        date={msg.date} 
                        character_pic_path={msg.character_pic_path || "character.png"} 
                        showIconAndName={showIconAndName} 
                        onCharacterClick={onCharacterClick} 
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <ChatInput
            verifiedCharacters={verifiedCharacters}
            roomId={roomId}
            user={user}
          />
        </>
      ) : (
        <>
        <h1>Select or create a room first</h1>
        <button className='redirect-roomcreation' onClick={openServerRooms}>Create</button>
        <button className='redirect-roomcreation' onClick={openServerInfo}>About the Server</button>
        </>
        
      )}
    </div>
  );
};

const ChatInput = ({ verifiedCharacters, roomId, user }) => {
  const [message, setMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');

  useEffect(() => {
    // Set the default selected character when verifiedCharacters is updated
    if (verifiedCharacters.length > 0) {
      setSelectedCharacter(verifiedCharacters[0].id); // Default to the first character in the list
    }
  }, [verifiedCharacters]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCharacterChange = (event) => {
    setSelectedCharacter(event.target.value);
  };

  const handleSendMessage = () => {
    if (!selectedCharacter) {
      console.error('No character selected. Cannot send message.');
      return;
    }

    const formattedMessage = convertEmojisToText(message);
    socket.emit("send_message", { roomId, userId: user.uid, characterId: selectedCharacter, message: formattedMessage });
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message.trim().length > 0) {
      handleSendMessage();
    }
  };

  return (
    <div className='chat-input-wrapper'>
      <select value={selectedCharacter} onChange={handleCharacterChange}>
        {verifiedCharacters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.character_name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        maxLength="500"
      />
      <button onClick={handleSendMessage} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default ChatWindow;