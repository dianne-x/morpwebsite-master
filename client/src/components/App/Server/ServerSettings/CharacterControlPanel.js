import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterInfo from '../../Character/CharacterInfo';

const CharacterControlPanel = ({ serverId, characterChanging }) => {
    const [characters, setCharacters] = useState([]);
    const [filter, setFilter] = useState('all');
    const [characterInfoData, setCharacterInfoData] = useState(null);
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacters.php?serverId=${serverId}`)
            .then(response => {
                //console.log('The server id is:',serverId);
                //console.log('API response:', response.data); // Log the response data
                if (Array.isArray(response.data)) {
                    setCharacters(response.data);
                    //console.log('Characters state updated:', response.data); // Log the updated characters state
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching characters:', error));
    }, [serverId]);

    const handleAccept = (characterId, characterName) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to accept ${characterName}?`)) {

            axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/CharacterAccept.php`, {
                characterId: characterId // Ensure characterId is correctly sent
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                //console.log('Character accepted:', response.data);
                setCharacters(characters.map(character => 
                    character.id === characterId ? { ...character, is_verified: 1 } : character
                ));
                characterChanging();
            })
            .catch(error => console.error('Error accepting character:', error));
        }

    };

    const handleReject = (characterId, characterName) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to reject/delete ${characterName}?`)) {

            axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/deleteCharacter.php`, {
                characterId
            })
            .then(response => {
                //console.log('Character rejected:', response.data);
                setCharacters(characters.filter(character => character.id !== characterId));
                characterChanging();
            })
            .catch(error => console.error('Error rejecting character:', error));
        }

    };
    const handleCharacterInfo = (characterId, name, picture) => {
        setCharacterInfoData({
            id: characterId,
            name: name,
            picture: picture
        });
    };

    const filteredCharacters = characters.filter(character => {
        if (filter === 'all') return true;
        if (filter === 'verified') return character.is_verified === 1;
        if (filter === 'not_verified') return character.is_verified === 0;
        return true;
    });

    //console.log('Filter:', filter); // Log the current filter
    //console.log('Filtered characters:', filteredCharacters); // Log the filtered characters

    return (
        <>
            { 
            !characterInfoData 
            ? 
            <div>
                <h1>Character Control Panel</h1>
                <p>Manage your character settings here.</p>
                <select onChange={(e) => setFilter(e.target.value)} value={filter} className='server-character-list-view-select'>
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="not_verified">Not Verified</option>
                </select>
                <ul className='server-character-list-view'>
                    {filteredCharacters.map(character => (
                        <li key={character.id} className={character.is_verified === 0 ? 'not-verified' : ''}>
                            <div 
                                className='info'
                                onClick={() => handleCharacterInfo(character.id, character.character_name, character.character_pic_path)}
                                style={{cursor: 'pointer'}}>
                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${character.character_pic_path || 'character.png'}`} />
                                {character.character_name}
                            </div>
                            <div className='modify'>
                                {character.is_verified === 0 && (
                                    <button 
                                        onClick={() => handleAccept(character.id, character.character_name)} 
                                        className='accept'>
                                            Accept
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleReject(character.id, character.character_name)}
                                    className='reject'>
                                    {character.is_verified === 0 ? 'Reject' : 'Delete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            :
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000}}>
                <CharacterInfo
                    characterId={characterInfoData.id}
                    onClose={() => setCharacterInfoData(null)}
                    name={characterInfoData.name}
                    picture={characterInfoData.picture}
                />   
            </div>
        }
        </>
    );
};

export default CharacterControlPanel;