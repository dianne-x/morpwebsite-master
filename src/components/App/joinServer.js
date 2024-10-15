import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/JoinServerForm.scss'; // Import the SCSS file

const JoinServerForm = ({ onClose }) => {
  const [inviteLink, setInviteLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the invite link submission logic here
    console.log('Invite Link:', inviteLink);
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