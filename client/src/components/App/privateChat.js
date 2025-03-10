import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import '../../style/App/Server/privateChat.scss'; // Import the new stylesheet

const socket = io.connect('http://localhost:3001');

const PrivateChat = ({ user2, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const chatMessagesRef = useRef(null);

  // Retrieve user1 from localStorage
  const user1 = { uid: JSON.parse(localStorage.getItem('morp-login-user')) };

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        console.log('Fetching room ID for:', user1.uid, user2.uid); // Debug statement
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getDirectMessageRoom.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user1_id: user1.uid, user2_id: user2.uid }),
        });
        const data = await response.json();
        if (data.success) {
          setRoomId(data.roomId);
        } else {
          console.error('Failed to fetch room ID:', data.error);
        }
      } catch (error) {
        console.error('Error fetching room ID:', error);
      }
    };

    fetchRoomId();
  }, [user1.uid, user2.uid]);

  useEffect(() => {
    if (roomId) {
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
    }
  }, [roomId]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !roomId) return;

    const messageData = {
      roomId,
      sentFrom: user1.uid,
      sentTo: user2.uid,
      message
    };

    console.log('Sending direct message:', messageData);
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
      console.log('Response from sendPrivateMessage.php:', data);
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
    <div className="private-chat-container">
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className='room-details-wrapper'>
        <h1>Private Chat with {user2.name}</h1>
      </div>

      <div className='chat-messages-wrapper'>
        <div className='chat-messages' ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sent_from === user1.uid ? 'sent' : 'received'}`}>
              <span>{msg.message}</span>
              <span className="chat-date">{new Date(msg.sent).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='chat-input-wrapper'>
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
  user2: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PrivateChat;