import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterControlPanel = ({ serverId }) => {
    const [characters, setCharacters] = useState([]);
    const [filter, setFilter] = useState('all');
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacters.php?serverId=${serverId}`)
            .then(response => {
                console.log('The server id is:',serverId);
                console.log('API response:', response.data); // Log the response data
                if (Array.isArray(response.data)) {
                    setCharacters(response.data);
                    console.log('Characters state updated:', response.data); // Log the updated characters state
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching characters:', error));
    }, [serverId]);

    const filteredCharacters = characters.filter(character => {
        if (filter === 'all') return true;
        if (filter === 'verified') return character.is_verified === 1;
        if (filter === 'not_verified') return character.is_verified === 0;
        return true;
    });

    console.log('Filter:', filter); // Log the current filter
    console.log('Filtered characters:', filteredCharacters); // Log the filtered characters

    return (
        <div>
            <h1>Character Control Panel</h1>
            <p>Manage your character settings here.</p>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="not_verified">Not Verified</option>
            </select>
            <ul>
                {filteredCharacters.map(character => (
                    <li key={character.id}>{character.character_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterControlPanel;