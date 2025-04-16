import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/JoinServerForm.scss'; // Import the SCSS file

const JoinServerForm = ({serverTrigger}) => {
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
    //console.log('Invite Link:', inviteLink);
    //console.log('User ID:', userId);

    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/joinServer.php?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inviteLink: inviteLink, userId: userId })
      });

      //console.log('Response:', response);

      const data = await response.json();

      if (data.success) {
        serverTrigger();
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while trying to join the server.');
    }
  };

  return (
      <>
        <h2>Join Server</h2>
        <form onSubmit={handleSubmit} className='joinServerForm'>
            <label>Invite Link:</label>
            <input
              type="text"
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              required
            />
          <button type="submit">Join</button>
        </form>
      </>
  );
};


export default JoinServerForm;