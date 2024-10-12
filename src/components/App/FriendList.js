import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TopBarButton from './TopBarButton';

const initialFriends = [
    { id: 1, icon: '👨', name: 'Josh' },
    { id: 2, icon: '👩', name: 'Alice' },
    { id: 3, icon: '👧', name: 'Lily' },
    { id: 4, icon: '👦', name: 'Tom' },
    { id: 5, icon: '👵', name: 'Granny' },
    { id: 6, icon: '👴', name: 'Grandpa' },
    { id: 7, icon: '👶', name: 'Baby' },
    { id: 8, icon: '🧒', name: 'Kid' },
    { id: 9, icon: '🧑', name: 'Adult' },
    { id: 11, icon: '👨‍🦱', name: 'Curly' },
    { id: 13, icon: '👨‍🦲', name: 'Bald' },
    { id: 15, icon: '👨‍🦳', name: 'Gray' },
    { id: 17, icon: '👱‍♂️', name: 'Blond' },
    { id: 19, icon: '🧔', name: 'Beard' },
    { id: 20, icon: '👨‍🦰', name: 'Redhead' },
    { id: 22, icon: '👨‍🦱', name: 'Curly' }
];

const FriendList = ({ onFriendClick }) => {
  const [friends, setFriends] = useState(initialFriends);

  return (
    <>
      {friends.map((friend) => (
        <TopBarButton key={friend.id} icon={friend.icon} onClick={() => onFriendClick(friend)} title={friend.name} />
      ))}
    </>
  );
};

// Prop validation
FriendList.propTypes = {
  onFriendClick: PropTypes.func.isRequired,
};

export default FriendList;