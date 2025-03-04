import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const FriendList = ({ onFriendClick }) => {
  const [friends, setFriends] = useState([]);
  const user = JSON.parse(localStorage.getItem('morp-login-user'));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/viewFriends.php?user_id=${user}`);
        const data = await response.json();
        console.log('Fetched friends:', data);
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [user.uid]);

  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <TopBarButton
            key={friend.uid}
            icon={<img src={friend.profile_pic_path || 'default-profile-pic-url'} alt={friend.name} width="30" height="30" />}
            onClick={() => onFriendClick(friend)}
            title={friend.name}
          />
        ))
      ) : (
        <p>You have yet to befriend anyone.</p>
      )}
    </>
  );
};

// Prop validation
FriendList.propTypes = {
  onFriendClick: PropTypes.func.isRequired,
};

export default FriendList;