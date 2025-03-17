import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../../../style/App/Character/CharacterInfo.scss'; // Import the CSS for CharacterInfo

const CharacterInfo = ({ characterId, onClose, name, picture }) => {
    const [characterInfo, setCharacterInfo] = useState(null);

    useEffect(() => {
        // Fetch character information
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterData.php?characterId=${characterId}`)
            .then(response => {
                console.log('Response:', response); // Log the entire response
                if (response.data.success) {
                    setCharacterInfo(response.data.character);
                    console.log(response.data.character);
                    
                } else {
                    console.error('Error fetching character data:', response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the character data!', error);
            });
    }, [characterId]);

    if (!characterInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="character-info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={onClose}>&times;</button>
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${picture || 'character.png'}`} alt="Character Icon" style={{width: '100px', height: '100px'}} />
            <h2>{name}</h2>
            <p>Gender: {characterInfo.gender}</p>
            <p>Species: {characterInfo.species}</p>
            <p>Status: {characterInfo.status_type}</p>
            <p>Affiliation: {characterInfo.affiliation}</p>
            <p>Nationality: {characterInfo.nationality}</p>
            <p>Occupation: {characterInfo.occupation}</p>
            <p>FC Type: {characterInfo.fc_type}</p>
            <p>FC Name: {characterInfo.fc_name != '' ? characterInfo.fc_name : 'unknown'}</p>
        </div>
    );
};

export default CharacterInfo;
