import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersControl = ({ allUsers, onRoleReload }) => {
    const [filter, setFilter] = useState('all');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        console.log('All users:', allUsers);
        
        let usersList = [];
        if (filter === 'all') {
            usersList = [...allUsers.moderators, ...allUsers.regularUsers];
        } else if (filter === 'moderators') {
            usersList = allUsers.moderators;
        } else if (filter === 'users') {
            usersList = allUsers.regularUsers;
        }
        setFilteredUsers(usersList);
    }, [filter, allUsers]);

    const changeRole = async (user, isPromotion) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to ${isPromotion ? "promote" : "demote"} ${user.name}?\n${(user.is_moderator == 1 && isPromotion) ? "You will grant owner rights to this user and this way you will lose your ownership over the server. Do you wish to continue?" : ""}`)) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/changeServerRole.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.uid,
                    isPromotion: isPromotion,
                    owner_id: allUsers.owners[0].uid
                })
            });
            const data = await response.json();
            console.log(data);
            onRoleReload();
            // Optionally, you can update the UI based on the response
        } catch (error) {
            console.error('Error changing role:', error);
        }
    }

    return (
        <div>
            <h1>Users Control</h1>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="moderators">Moderators</option>
                <option value="users">Users</option>
            </select>
            <ul className='server-character-list-view'>
                {filteredUsers.map(user => (
                    <li key={user.uid} className={user.is_moderator == 1 ? 'moderator' : 'user'}>
                        <div className='info'>
                            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${user.profile_pic_path || 'user.png'}`} />
                            {user.name}
                        </div>
                        <div className='modify'>
                            <button 
                                className='accept'
                                onClick={() => changeRole(user, true)}>
                                Promote
                            </button>
                            {user.is_moderator && 
                                <button 
                                    className='reject'
                                    onClick={() => changeRole(user, false)}>
                                    Demote
                                </button>}
                            <button className='reject'>Kick</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersControl;