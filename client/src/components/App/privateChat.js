import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const PrivateChat = ({ user1, user2 }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const roomId = `${user1}-${user2.uid}`;
    console.log('Joining direct message room:', roomId);
    socket.emit('join_direct_message_room', roomId);

    socket.on('previous_direct_messages', (messages) => {
        console.log('Previous direct messages:', messages);
      setMessages(messages);
    });

    socket.on('receive_direct_message', (messageData) => {
        console.log('Received direct message:', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('previous_direct_messages');
      socket.off('receive_direct_message');
    };
  }, [user1, user2.uid]);

  console.log("{user1, user2}", {user1, user2});

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const roomId = `${user1}-${user2.uid}`;
    const messageData = {
      roomId,
      sentFrom: user1,
      sentTo: user2.uid,
      message
    };

    socket.emit('send_direct_message', messageData);

    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/sendPrivateMessage.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message.trim().length > 0) {
      handleSendMessage();
    }
  };

  return (
    <div className="private-chat">
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sent_from === user1 ? 'sent' : 'received'}`}>
            <span>{msg.message}</span>
            <span className="chat-date">{new Date(msg.sent).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-wrapper">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          maxLength="500"
        />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

PrivateChat.propTypes = {
  user1: PropTypes.object.isRequired,
  user2: PropTypes.object.isRequired,
};

export default PrivateChat;