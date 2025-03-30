import React from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const FriendList = ({ onFriendClick, friends }) => {
  return (
    <>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <TopBarButton
            key={friend.uid}
            picPath={`url(${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${friend.profile_pic_path})`}
            onClick={() => onFriendClick(friend)}
            title={friend.name}
          />
        ))
      ) : (
        <p>You have no friends gang</p>
      )}
    </>
  );
};

// Prop validation
FriendList.propTypes = {
  onFriendClick: PropTypes.func.isRequired,
};

export default FriendList;