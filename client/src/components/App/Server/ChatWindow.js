import React, { useState, useEffect, useRef } from 'react';
import '../../../style/App/Server/ChatWindow.scss';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBars, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ChatMessage from './ChatMessage';
import { convertEmojisToText, emojiMap } from '../../../utils/emojiConverter';

const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`); 

const ChatWindow = ({ serverId, roomId, servers = [], roomDetails, onCharacterClick, openServerInfo, openServerRooms, characterChangeTrigger }) => {
  const [selectedServer, setSelectedServer] = useState(serverId);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [verifiedCharacters, setVerifiedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedCharactersId , setSelectedCharactersId] = useState('');
  const prevCharacterRef = useRef('');
  const chatMessagesRef = useRef(null);
  const [precomputedMessages, setPrecomputedMessages] = useState([]); // Separate state for precomputed messages

  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  const handleServerChange = (id) => {
    setSelectedServer(id);
  };

  useEffect(() => {
    handleServerChange(serverId);
  }, [serverId]);

  const handleCharacterChange = (event) => {
    const characterId = event.target.value;
    setSelectedCharactersId(characterId);
    setSelectedCharacter(characterId);

    // Fetch aliases for the selected character
    const fetchAliases = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/characterAliases.php?characterId=${characterId}`);
        const data = await response.json();
        console.log('Fetched aliases:', data); // Debug log for aliases
        const updatedCharacters = verifiedCharacters.map((char) =>
          char.id === characterId ? { ...char, aliases: data } : char
        );
        setVerifiedCharacters(updatedCharacters);
      } catch (error) {
        console.error('Error fetching aliases:', error);
      }
    };

    fetchAliases();
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const formattedMessage = convertEmojisToText(message); // Convert emojis to text codes for saving
    console.log('Sending message:', { roomId, userId: user.uid, characterId: selectedCharactersId, message: formattedMessage });
    socket.emit("send_message", { roomId: roomId, userId: user.uid, characterId: selectedCharactersId, message: formattedMessage });
    setMessage(''); // Clear the input after sending the message
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message.trim().length > 0) {
      handleSendMessage();
    }
  };

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
    // Fetch the verified characters for the selected server
    const fetchVerifiedCharacters = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/useableCharacterForChat.php?serverId=${selectedServer}&userId=${user}`);
        console.log(`fetch url: ${process.env.REACT_APP_PHP_BASE_URL}/useableCharacterForChat.php?serverId=${selectedServer}&userId=${user}`);
        const data = await response.json();
        console.log('Fetched characters:', data); // Log the fetched data to verify structure
        setVerifiedCharacters(data);
        if (data.length > 0) {
          setSelectedCharacter(data[0].id);
          setSelectedCharactersId(data[0].id);
          console.log(data[0]);
        }
      } catch (error) {
        console.error('Error fetching verified characters:', error);
      }
    };

    if (selectedServer) {
      fetchVerifiedCharacters();
    }
  }, [selectedServer, user, characterChangeTrigger]);

  useEffect(() => {
    console.log('Verified Characters:', verifiedCharacters); // Log the state to verify aliases
  }, [verifiedCharacters]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Precompute aliases for all messages when messages or verifiedCharacters change
    const computedMessages = messages.map((msg) => {
      const character = verifiedCharacters.find((char) => char.id === msg.character_id);
      const aliases = character && Array.isArray(character.aliases) ? character.aliases.map(alias => alias.name) : [];
      return { ...msg, aliases };
    });
    setPrecomputedMessages(computedMessages);
  }, [messages, verifiedCharacters]);

  return (
    <div className="chat-window">
      {roomDetails ? (
        <>
          <div className='room-details-wrapper'>
            <FontAwesomeIcon icon={faBars} className='room-icon' onClick={openServerRooms} />
            <h1>{roomDetails.room_name}</h1>
            <FontAwesomeIcon icon={faInfoCircle} className='room-icon' onClick={openServerInfo}/>
          </div>

          <div className='chat-messages-wrapper'>
            <div className='chat-messages' ref={chatMessagesRef}>
              {precomputedMessages
                .filter((msg) => msg.room_id == roomId) // Filter messages by selected room
                .map((msg, index) => {
                  const showIconAndName = index === 0 || prevCharacterRef.current !== msg.character_id;
                  prevCharacterRef.current = msg.character_id; // Update prevCharacterRef to current msg.character_id

                  return (
                    <div key={index}>
                      <ChatMessage 
                        key={index} 
                        name={msg.character_name} 
                        aliases={msg.aliases} // Use precomputed aliases
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

export default ChatWindow;