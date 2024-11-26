import React, { useState } from 'react';
import characterData from '../components/testSearchByName.json'; // Import the JSON file
import '../style/searchbyname.scss'; // Import the CSS file

const SearchByName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const character = characterData.characters.find(
      (char) => char.CharacterName.toLowerCase() === searchTerm.toLowerCase()
    );
    setResult(character ? character : 'No character found');
  };

  return (
    <div className='main-content'>
        <div className="search-container">
        <div className="search-bar">
            <h2>Search Character</h2>
            <input
            type="text"
            placeholder="Enter Character Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-result">
            {result ? (
            typeof result === 'string' ? (
                <p>{result}</p>
            ) : (
                <div>
                <p><strong>Player Name:</strong> {result.playerName}</p>
                <p><strong>Character Name:</strong> {result.CharacterName}</p>
                <p><strong>Character Gender:</strong> {result.CharacterGender}</p>
                <p><strong>Character Tier:</strong> {result.CharacterTier}</p>
                </div>
            )
            ) : (
            <p>Enter a character name to search</p>
            )}
        </div>
        </div>
    </div>
  );
};

export default SearchByName;