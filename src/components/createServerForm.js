import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/createServerForm.scss'; // Import the SCSS file

const ServerCreationForm = ({ onClose }) => {
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState(null);
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('serverName', serverName);
    formData.append('serverIcon', serverIcon);
    formData.append('uid', uid);

    try {
      const response = await fetch('http://localhost/morpwebsite-master/src/php/createServer.php', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text(); // Get the response text
      console.log(text); // Log the response text for debugging

      const result = JSON.parse(text); // Parse the response text as JSON

      if (result.success) {
        setSuccess('Server created successfully.');
        onClose(); // Close the form modal after submission
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      setError('An error occurred while creating the server.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Server</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Server Name:</label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Server Icon:</label>
            <input
              type="file"
              onChange={(e) => setServerIcon(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label>Unique ID (UID):</label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Create Server</button>
        </form>
      </div>
    </div>
  );
};

ServerCreationForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ServerCreationForm;