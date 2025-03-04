import React, { useState, useEffect } from 'react';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        console.log(`Fetching friend requests for user_id: ${user}`);
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/viewFriendRequests.php?user_id=${user}`);
        const data = await response.json();
        console.log('Fetched friend requests:', data);
        setFriendRequests(data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, [user.uid]);

  const handleAcceptRequest = async (requestId) => {
    try {
      console.log(`Accepting friend request with id: ${requestId}`);
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/acceptFriendRequest.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: requestId }),
      });
      const data = await response.json();
      console.log('Accept request response:', data);
      if (data.success) {
        alert('Friend request accepted!');
        setFriendRequests(friendRequests.filter(request => request.id !== requestId));
      } else {
        alert('Failed to accept friend request.');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      console.log(`Rejecting friend request with id: ${requestId}`);
      const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/rejectFriendReqeust.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: requestId }),
      });
      const data = await response.json();
      console.log('Reject request response:', data);
      if (data.success) {
        alert('Friend request rejected!');
        setFriendRequests(friendRequests.filter(request => request.id !== requestId));
      } else {
        alert('Failed to reject friend request.');
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h1>Friend Requests</h1>
      <ul>
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <li key={request.id}>
              <img src={request.sender_profile_pic || 'default-profile-pic-url'} alt={request.sender_name} width="50" height="50" />
              <span>{request.sender_name}</span>
              <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
              <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
            </li>
          ))
        ) : (
          <li>No friend requests</li>
        )}
      </ul>
    </div>
  );
};

export default FriendRequests;