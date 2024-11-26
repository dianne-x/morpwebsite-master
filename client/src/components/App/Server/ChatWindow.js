import React from 'react';
import '../../../style/App/Server/ChatWindow.scss';

const ChatWindow = ({ serverId }) => {
  // Example chat messages for different servers
  const chatMessages = {
    3: [
      { user: 'User1', message: 'Welcome to Earth! 🌍' },
      { user: 'User2', message: 'Excited to chat about Earth!' },
    ],
    4: [
      { user: 'User3', message: 'Rocket server is ready for launch! 🚀' },
      { user: 'User4', message: 'Let’s explore the cosmos!' },
    ],
    // Add more server-specific messages as needed
    1: [ // Home server messages
      { user: 'Bot', message: 'Welcome to the Home server! Navigate to choose a server.' },
    ],
    // Default messages if no specific server is matched
    default: [
      { user: 'Bot', message: 'Select a server to start chatting!' },
    ],
  };

  // Determine messages based on serverId
  const messages = chatMessages[serverId] || chatMessages.default;

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.user}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
