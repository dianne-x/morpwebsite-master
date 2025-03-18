import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/Character/CharacterInfo.scss'; // Import the CSS for CharacterInfo

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
            <div className='character-data'>
                <div className='character-pic-name'>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${picture || 'character.png'}`} alt="Character Icon" style={{width: '100px', height: '100px'}} />
                    <h2>{name}</h2>
                </div>
                <table>
                    <tr>
                        <td>Gender</td>
                        <td>{characterInfo.gender}</td>
                    </tr>
                    <tr>
                        <td>Species</td>
                        <td>{characterInfo.species}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{characterInfo.status}</td>
                    </tr>
                    <tr>
                        <td>Affiliation</td>
                        <td>{characterInfo.affiliation}</td>
                    </tr>
                    <tr>
                        <td>Nationality</td>
                        <td>{characterInfo.nationality}</td>
                    </tr>
                    <tr>
                        <td>Occupation</td>
                        <td>{characterInfo.occupation}</td>
                    </tr>
                    <tr>
                        <td>FC Type</td>
                        <td>{characterInfo.fc_type}</td>
                    </tr>
                    <tr>
                        <td>FC Name</td>
                        <td>{characterInfo.fc_name != '' ? characterInfo.fc_name : 'unknown'}</td>
                    </tr>
                </table>
            </div>
            <div className='character-details'>
                <h3>Biography</h3>
                <p>{characterInfo.bio}</p>
    
                <h3>Powers</h3>
                <p>{characterInfo.powers}</p>
    
                <h3>Weaknesses</h3>
                <p>{characterInfo.weaknesses}</p>
            </div>
        </div>
    );
};

export default CharacterInfo;
