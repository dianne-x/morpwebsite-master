import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';
import PrivateChat from './privateChat';

const FriendList = ({ onFriendClick }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setIsChatOpen(true);
    onFriendClick(friend);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedFriend(null);
  };

  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <TopBarButton
            key={friend.uid}
            picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${friend.profile_pic_path})`}
            onClick={() => handleFriendClick(friend)}
            title={friend.name}
          />
        ))
      ) : (
        <p>You have no friends gang</p>
      )}
      {isChatOpen && selectedFriend && (
        <PrivateChat user2={selectedFriend} onClose={closeChat} />
      )}
    </>
  );
};

// Prop validation
FriendList.propTypes = {
  onFriendClick: PropTypes.func.isRequired,
};

export default FriendList;