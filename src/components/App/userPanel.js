import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../style/App/userPanel.scss'; // Import the SCSS file
import axios from 'axios';

const UserPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    nickname: '',
    about_me: '',
  });

  useEffect(() => {
    if (activeTab === 'Profile') {
      fetchUserProfile();
    }
  }, [activeTab]);

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem('morp-login-user');
    if (!userId) {
      alert('User ID not found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost/morpwebsite-master/src/php/getProfileData.php?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setUserData(data.user); // Assuming the API returns user data in the format expected.
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the profile data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, // Dynamically update the appropriate field in the userData state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (reloading the page)

    fetch(`http://localhost/morpwebsite-master/src/php/updateUser.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Send the updated user data to the server
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert('User data saved successfully.');
        } else {
          alert('Failed to save user data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while saving user data.');
      });
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="user-panel">
        <div className="sidebar">
          <button onClick={() => setActiveTab('Profile')}>Profile</button>
          <button onClick={() => setActiveTab('Characters')}>Characters</button>
          <button onClick={() => setActiveTab('Settings')}>Settings</button>
        </div>
        <div className="content">
          {activeTab === 'Profile' && userData && (
            <form onSubmit={handleSubmit}> {/* Use form with onSubmit handler */}
              <h2>Profile</h2>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange} // Add onChange handler
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange} // Add onChange handler
                />
              </label>
              <label>
                Nickname:
                <input
                  type="text"
                  name="nickname"
                  value={userData.nickname}
                  onChange={handleInputChange} // Add onChange handler
                />
              </label>
              <label>
                About me:
                <input
                  type="text"
                  name="about_me"
                  value={userData.about_me}
                  onChange={handleInputChange} // Add onChange handler
                />
              </label>
              <label>
                Avatar:
                <input type="file" />
              </label>
              <button type="submit">Save</button> {/* Use button of type "submit" */}
            </form>
          )}
          {activeTab === 'Characters' && (
            <div>
              <h2>Characters</h2>
              {/* Add characters content */}
            </div>
          )}
          {activeTab === 'Settings' && (
            <div>
              <h2>Settings</h2>
              {/* Add settings content */}
            </div>
          )}
        </div>
        <button className="close" onClick={onClose}>&times;</button>
      </div>
    </>
  );
};

UserPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UserPanel;
