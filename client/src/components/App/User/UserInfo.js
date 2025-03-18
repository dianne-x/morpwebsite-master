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
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${userInfo.profile_pic_path}`} alt="User Icon" className='user-img'/>
                <h2>{userInfo.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>{userInfo.email}</td>
                        </tr>
                        <tr>
                            <td>Nickname:</td>
                            <td>{userInfo.nickname || <span>No nickname</span>}</td>
                        </tr>
                        <tr>
                            <td>About Me:</td>
                            <td>{userInfo.about_me || <span>No about me</span>}</td>
                        </tr>
                    </tbody>
                </table>
                {
                serverId &&
                <div className='characters-wrapper'>
                    <h3>Characters on the server:</h3>
                    {
                    characters.length > 0 ?
                    <ul className='server-character-list-view' style={{cursor: 'pointer'}}>
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
                                <div className='info'>
                                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${character.character_pic_path || 'character.png'}`}/>
                                    {character.character_name}
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <span>User has no available characters</span>
                    }
                </div>
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
