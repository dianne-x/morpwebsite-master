import React, { useState, useEffect } from 'react';
import UserInfo from '../User/UserInfo'; // Import UserInfo component

const FriendRequests = ({friendTrigger}) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user
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
        friendTrigger();
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
    <>
      {!selectedUserId ? (
        <>
          <h1>Friend Requests</h1>
          <ul className='server-character-list-view'>
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                  <li key={request.id}>
                    <div 
                      className='info'
                      onClick={() => setSelectedUserId(request.sender_id)} // Set selected user ID
                      style={{ cursor: 'pointer' }}>
                      <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${request.sender_profile_pic || 'user.png'}`} alt={request.sender_name} />
                      <span>{request.sender_name}</span>
                    </div>
                    <div className='modify'>
                      <button className='accept' onClick={() => handleAcceptRequest(request.id)}>
                        Accept
                      </button>
                      <button className='reject' onClick={() => handleRejectRequest(request.id)}>
                        Reject
                      </button>
                    </div>
                  </li>
              ))
            ) : (
              <li>No friend requests</li>
            )}
          </ul>
        </>
      ) : (
        <UserInfo userId={selectedUserId} onClose={() => setSelectedUserId(null)} /> // Display UserInfo
      )}
    </>
  );
};

export default FriendRequests;