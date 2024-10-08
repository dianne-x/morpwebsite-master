import React, { useState } from 'react';
import '../../style/HomePage.scss';
import logo from '../../img/logodark.jpg'; // Replace with your logo path

const HomePage = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [name, setName] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const friends = [
      { id: 1, name: 'Alice', online: true },
      { id: 2, name: 'Bob', online: false },
      { id: 3, name: 'Charlie', online: true },
      // Add more friends as needed
    ];
  
    const handleFriendClick = (friend) => {
      setSelectedFriend(friend);
    };
  
    const handleCloseChat = () => {
      setSelectedFriend(null);
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        
        const reportData = {
            name: name,
            description: problemDescription,
        };

        // Send the report via email
        const mailtoLink = `mailto:kornel@bobak.ws?subject=Bug Report from ${name}&body=${encodeURIComponent(JSON.stringify(reportData))}`;
        window.location.href = mailtoLink; // This will open the default mail client

        // Clear the form and provide feedback
        setName('');
        setProblemDescription('');
        setFeedbackMessage('Report sent! Thank you for your feedback.');
    };
  
    return (
      <div className="homepage">
        <div className="friend-list">
          <h2>Friends</h2>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} onClick={() => handleFriendClick(friend)}>
                <div className={`friend-status ${friend.online ? 'online' : 'offline'}`}></div>
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
  
        {/* Centered content */}
        <div className="centered-content">
          <div className="logo">
            {/* You can uncomment the logo image if needed */}
            {/* <img src={logo} alt="Logo" /> */}
          </div>
          <div className="welcome-text">Welcome to MORP</div>
        </div>

        {/* Chat window for selected friend */}
        {selectedFriend && (
          <div className="text-window">
            <div className="text-window-header">
              <span>{selectedFriend.name}</span>
              <button onClick={handleCloseChat}>Close</button>
            </div>
            <div className="text-window-content">
              <p>Chat with {selectedFriend.name}</p>
            </div>
          </div>
        )}

        {/* Bug Report Section */}
        <div className="bug-report">
          <h2>Report a Bug</h2>
          <p>If you encounter any issues, please let us know!</p>
          <p>Contact us at: <a href="mailto:kornel@bobak.ws">kornel@bobak.ws</a></p>
          
          <form onSubmit={handleReportSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Describe the problem..."
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              required
            />
            <button type="submit">Send Report</button>
          </form>

          {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
        </div>
      </div>
    );
};

export default HomePage;
