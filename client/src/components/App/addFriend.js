import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/searchFriend.php?name=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
      console.log('Search results:', data); // Log the search results to verify the uid
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSendFriendRequest = async (receiverId) => {
    const senderId = JSON.parse(localStorage.getItem('morp-login-user'));
    console.log('sender:', senderId); // Log the current user to verify the uid

    if (!senderId) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/sendFriendRequest.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Friend request sent successfully!');
      } else {
        alert(`Failed to send friend request: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div>
      <h1>Add Friend</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for a friend..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <li key={result.uid}>
              <span>{result.name}</span>
              <button onClick={() => handleSendFriendRequest(result.uid)}>Send Friend Request</button>
            </li>
          ))
        ) : (
          <li>User not found</li>
        )}
      </ul>
    </div>
  );
};

AddFriend.propTypes = {
  // Define any prop types if needed
};

export default AddFriend;