import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/JoinServerForm.scss'; // Import the SCSS file

const JoinServerForm = ({ onClose }) => {
  const [inviteLink, setInviteLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    var userId = localStorage.getItem('morp-login-user'); // Assuming the user ID is stored in localStorage

    if (!inviteLink) {
      alert('Please enter an invite link.');
      return;
    }

    if (!userId) {
      alert('User ID not found. Please log in.');
      return;
    }



    // Log the inviteLink and userId
    console.log('Invite Link:', inviteLink);
    console.log('User ID:', userId);

    try {
      const response = await fetch(`http://localhost/morpwebsite-master/src/php/joinServer.php?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inviteLink: inviteLink, userId: userId })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while trying to join the server.');
    }

    onClose(); // Close the form modal after submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Join Server</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Invite Link:</label>
            <input
              type="text"
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              required
            />
          </div>
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

JoinServerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default JoinServerForm;