import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/User/UserInfo.scss'; // Import the CSS for UserInfo

const UserInfo = ({ userId, onClose }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        // Fetch user information
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getProfileData.php?userId=${userId}`)
            .then(response => {
                if (response.data.success) {
                    setUserInfo(response.data.user);
                } else {
                    console.error('Error fetching user data:', response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });

        // Fetch user characters
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getUserCharacters.php?userId=${userId}`)
            .then(response => {
                if (response.data.success) {
                    setCharacters(response.data.characters);
                } else {
                    console.error('Error fetching user characters:', response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the user characters!', error);
            });
    }, [userId]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-info-modal">
            <button className="close" onClick={onClose}>&times;</button>
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${userInfo.profile_pic_path}`} alt="User Icon" />
            <h2>{userInfo.name}</h2>
            <p>Email: {userInfo.email}</p>
            <p>Nickname: {userInfo.nickname}</p>
            <p>About Me: {userInfo.about_me}</p>
            <h3>Characters:</h3>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserInfo;
