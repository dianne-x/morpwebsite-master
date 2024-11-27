import React, { useState, useEffect } from 'react';
import '../../../style/App/Server/ChatWindow.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001'); 

const ChatWindow = ({ serverId, servers = [] }) => {
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
      {/* Chat messages would be displayed here */}
      
      <div className="chat-controls">
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <select value={selectedServer} onChange={handleServerChange}>
          {servers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </div>
  );
};

export default ChatWindow;