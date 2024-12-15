import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChatWindow.scss';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const socket = io.connect('http://localhost:3001'); 

const ChatWindow = ({ serverId, servers = [], roomDetails }) => {
  const [selectedServer, setSelectedServer] = useState(serverId);
  const [message, setMessage] = useState('s');
  const [messageReceived, setMessageReceived] = useState('');

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("send_message", { message });
    // Handle sending the message
    console.log(`Message sent to server ${selectedServer}: ${message}`);
    setMessage(''); // Clear the input after sending the message
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]); 

  return (
    <div className="chat-window">
      {roomDetails ? (
        <>
          <div className='room-details-wrapper'>
            <h1>{roomDetails.room_name}</h1>
          </div>

          <div className='chat-messages-wrapper'>
            {messageReceived}
          </div>

          <div className='chat-input-wrapper'>
            <select value={selectedServer} onChange={handleServerChange}>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
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