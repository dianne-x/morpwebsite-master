import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterInfo from '../Character/CharacterInfo';
import '../../../style/App/User/UserInfo.scss'; // Import the CSS for UserInfo

const UserInfo = ({ userId, onClose, serverId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [selectedCharacterData, setSelectedCharacterData] = useState(null);

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

        if (!serverId) {
            return;
        }    
        // Fetch user characters
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getUserCharacters.php?userId=${userId}&serverId=${serverId}`)
            .then(response => {
                if (response.data.success) {
                    setCharacters(response.data.characters);
                } else {
                    console.error('Error fetching user characters:', response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the user characters!', error);
                console.error('Error details:', error.response); // Log the error response
            });
    }, [userId, serverId]); // Add serverId to the dependency array

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {
            !selectedCharacterData ?
            <div className="user-info-modal" onClick={e => e.stopPropagation()}>
                <button className="close" onClick={onClose}>&times;</button>
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${userInfo.profile_pic_path}`} alt="User Icon" style={{ width: '100px', height: '100px'}} />
                <h2>{userInfo.name}</h2>
                <p>Email: {userInfo.email}</p>
                <p>Nickname: {userInfo.nickname}</p>
                <p>About Me: {userInfo.about_me}</p>
                {
                serverId &&
                <>
                    <h3>Characters:</h3>
                    {
                    characters.length > 0 ?
                    <ul>
                        {characters.map(character => (
                            <li 
                                key={character.id}
                                onClick={() => {
                                    setSelectedCharacterData({
                                        id: character.id,
                                        name: character.character_name,
                                        picture: character.character_pic_path
                                    });
                                }}>
                                {character.character_name}
                            </li>
                        ))}
                    </ul>
                    :
                    <span>User has no available characters</span>
                    }
                </>
                }
            </div>
            :
            <CharacterInfo 
                characterId={selectedCharacterData.id} 
                onClose={() => setSelectedCharacterData(null)}
                name={selectedCharacterData.name}
                picture={selectedCharacterData.picture} />
            }
        </>
    );
};

export default UserInfo;
