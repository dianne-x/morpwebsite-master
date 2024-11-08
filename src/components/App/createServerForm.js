import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/createServerForm.scss'; // Import the SCSS file

const ServerCreationForm = () => {
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState(null);
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  var userId = localStorage.getItem('morp-login-user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('serverName', serverName);
    formData.append('serverIcon', serverIcon);
    formData.append('uid', uid);

    try {
      const response = await fetch(`http://localhost/morpwebsite-master/src/php/createServer.php?userId=${userId}`, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text(); // Get the response text
      console.log(text); // Log the response text for debugging

      const result = JSON.parse(text); // Parse the response text as JSON

      if (result.success) {
        setSuccess('Server created successfully.');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      setError('An error occurred while creating the server.');
    }
  };

  return (
    <>
      <h2>Create New Server</h2>
      <form onSubmit={handleSubmit}>
          <label
            htmlFor="serverIcon"
            id='serverIcon-label'
          ></label>
          <input
            type="file"
            name='serverIcon'
            id='serverIcon'
            onChange={(e) => setServerIcon(e.target.files[0])}
            required
          />
          <label>Server Name:</label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            required
          />
          <label>Unique ID (UID):</label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Create Server</button>
      </form>
    </>
  );
};

export default ServerCreationForm;