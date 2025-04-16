import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './User/UserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const currentUserId = JSON.parse(localStorage.getItem('morp-login-user'));
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/searchFriend.php?name=${searchQuery}`);
      const data = await response.json();
      const filteredResults = data.filter(user => user.uid !== currentUserId);
      setSearchResults(filteredResults);
      console.log('Search results:', filteredResults); // Log the filtered search results
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
    <>
      {!selectedUserId ? (
        <>
          <h1>Add Friend</h1>
          <div className='search-field-box'>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search for a friend..."
            />
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <ul className='server-character-list-view'>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <li key={result.uid}>
                  <div 
                    className='info'
                    onClick={() => setSelectedUserId(result.uid)}
                    style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${result.profile_pic_path || 'user.png'}`} />
                    <span>{result.name}</span>
                  </div>
                  <div className='modify'>
                    <button className='accept' onClick={() => handleSendFriendRequest(result.uid)}>
                      Add Friend
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <span>User not found</span>
            )}
          </ul>
        </>
      ) : (<UserInfo userId={selectedUserId} onClose={() => setSelectedUserId(null)} />)}
        
      
    </>
  );
};

AddFriend.propTypes = {
  // Define any prop types if needed
};

export default AddFriend;