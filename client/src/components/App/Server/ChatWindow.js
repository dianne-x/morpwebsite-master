import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChatWindow.scss';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const socket = io.connect('http://localhost:3001'); 

const ChatWindow = ({ serverId, roomId, servers = [], roomDetails }) => {
  const [selectedServer, setSelectedServer] = useState(serverId);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [verifiedCharacters, setVerifiedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedCharactersId , setSelectedCharactersId] = useState('');

  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const handleCharacterChange = (event) => {
    const characterId = event.target.value;
    setSelectedCharactersId(characterId);
    setSelectedCharacter(characterId);
    console.log(`Selected character: ${characterId}`);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log('Sending message:', { roomId, userId: user.uid, characterId: selectedCharactersId, message });
    socket.emit("send_message", { roomId: roomId, userId: user.uid, characterId: selectedCharactersId, message });
    setMessage(''); // Clear the input after sending the message
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
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
        setVerifiedCharacters(data);
        if (data.length > 0) {
          setSelectedCharacter(data[0].id);
          setSelectedCharactersId(data[0].id);
          console.log(`Selected character: ${data[0].character_name}`);
        }
      } catch (error) {
        console.error('Error fetching verified characters:', error);
      }
    };

    if (selectedServer) {
      fetchVerifiedCharacters();
    }
  }, [selectedServer, user]);

  return (
    <div className="chat-window">
      {roomDetails ? (
        <>
          <div className='room-details-wrapper'>
            <h1>{roomDetails.room_name}</h1>
          </div>

          <div className='chat-messages-wrapper'>
            {messages
              .filter((msg) => msg.room_id == roomId) // Filter messages by selected room
              .map((msg, index) => (
                <div key={index}>
                   <strong>{msg.character_name}</strong>: {msg.message}
                </div>
            ))}
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
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </>
      ) : (
        <h1>Select or create a room first</h1>
      )}
    </div>
  );
};

export default ChatWindow;