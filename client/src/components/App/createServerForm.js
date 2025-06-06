import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/createServerForm.scss'; // Import the SCSS file

const ServerCreationForm = ({serverTrigger}) => {
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState(null);
  const [tempServerPic, setTempServerPic] = useState('');
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  var userId = localStorage.getItem('morp-login-user');


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setServerIcon(file); // Set the file object
        const reader = new FileReader();
        reader.onloadend = () => {
            setTempServerPic(reader.result); // Set the temporary profile picture
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate UID
    const sanitizedUid = uid.toLowerCase().replace(/\s+/g, '');
    if (sanitizedUid !== uid) {
      setError('UID must be lowercase and contain no spaces.');
      return;
    }

    const formData = new FormData();
    formData.append('serverName', serverName);
    formData.append('serverIcon', serverIcon);
    formData.append('uid', sanitizedUid);

    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/createServer.php?userId=${userId}`, {
        method: 'POST',
        body: formData,
      });

      const text = await response.text(); // Get the response text
      //console.log(text); // Log the response text for debugging

      const result = JSON.parse(text); // Parse the response text as JSON

      if (result.success) {
        serverTrigger();
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
            style={{backgroundImage: `url(${tempServerPic})`}}
          ></label>
          <input
            type="file"
            name='serverIcon'
            id='serverIcon'
            onChange={handleFileChange}
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
        <button type="submit">Create Server</button>
      </form>
      {error && <p className="error" onClick={() => setError('')}>{error}</p>}
      {success && <p className="success">{success}</p>}
    </>
  );
};

export default ServerCreationForm;