import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import '../../style/App/Server/privateChat.scss'; // Import the new stylesheet

const socket = io.connect('http://localhost:3001');

const PrivateChat = ({ user2, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const chatMessagesRef = useRef(null);

  // Retrieve user1 from localStorage
  const user1 = { uid: JSON.parse(localStorage.getItem('morp-login-user')) };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(navigator.language || navigator.userLanguage, options).format(new Date(dateString));
  };

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
        const updatedMessages = messages.map((msg) => ({
          ...msg,
          sentFrom: msg.sent_from, // Ensure the field name matches
        }));
        setMessages(updatedMessages);
      });

      socket.on('receive_direct_message', (messageData) => {
        console.log('Received direct message:', messageData);
        messageData.sentFrom = messageData.sent_from; // Ensure the field name matches
        console.log('Current user ID:', user1.uid);
        console.log('Message sentFrom:', messageData.sentFrom);
        if (messageData.sentFrom !== user1.uid) {
          console.log('Message is from another user:', messageData);
          setMessages((prevMessages) => {
            // Check if the message is already present in the state
            if (!prevMessages.some(msg => msg.id === messageData.id)) {
              console.log('Adding message to state:', messageData);
              return [...prevMessages, messageData];
            }
            console.log('Message already in state:', messageData);
            return prevMessages;
          });
        } else {
          console.log('Message is from the current user, not adding to state:', messageData);
        }
      });

      return () => {
        socket.off('previous_direct_messages');
        socket.off('receive_direct_message');
      };
    }
  }, [roomId]);

  useEffect(() => {
    console.log('Messages updated:', messages);
    if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !roomId) return;

    const messageData = {
      id: uuidv4(), // Add a unique identifier to the message
      roomId: roomId,
      sentFrom: user1.uid,
      sentTo: user2.uid,
      message: message,
      sent: new Date().toISOString(),
      isSentByCurrentUser: true // Add this flag to indicate the message is sent by the current user
    };

    console.log('Sending direct message:', messageData);

    // Emit the message to the socket
    socket.emit('send_direct_message', messageData);

    // Clear the input field and update the messages state
    setMessage('');
    setMessages((prevMessages) => [...prevMessages, messageData]);
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
        <h1>{user2.name}</h1>
      </div>

      <div className='chat-messages-wrapper' ref={chatMessagesRef}>
        <div className='chat-messages' >
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sentFrom === user1.uid ? 'sent' : 'received'}`}>
              <span>{msg.message}</span>
              <span className="chat-date">{formatDate(msg.sent)}</span>
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