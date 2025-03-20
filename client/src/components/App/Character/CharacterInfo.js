import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/Character/CharacterInfo.scss';
import formatTextWithLineBreaks from '../../FormatTextWithLineBreaks';

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

    const characterDataTable = [
        { title: 'Gender', content: characterInfo.gender },
        { title: 'Species', content: characterInfo.species },
        { title: 'Status', content: characterInfo.status },
        { title: 'Affiliation', content: characterInfo.affiliation },
        { title: 'Nationality', content: characterInfo.nationality },
        { title: 'Occupation', content: characterInfo.occupation },
        { title: 'FC Type', content: characterInfo.fc_type },
        { title: 'FC Name', content: characterInfo.fc_name != '' ? characterInfo.fc_name : 'unknown' }
    ]

    const characterDetails = [
        { title: 'Biography', content: characterInfo.bio },
        { title: 'Powers', content: characterInfo.powers },
        { title: 'Weaknesses', content: characterInfo.weaknesses },
        { title: 'Used Items', content: characterInfo.used_item },
        { title: 'Family', content: characterInfo.family },
        { title: 'Universe', content: characterInfo.universe }
    ];

    return (
        <div className="character-info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={onClose}>&times;</button>
            <div className='character-data'>
                <div className='character-pic-name'>
                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${picture || 'character.png'}`} alt="Character Icon" />
                    <h2>{name}</h2>
                </div>
                <table>
                    <tbody>
                        {characterDataTable.map((data, index) => (
                            data.content && (
                                <tr key={index}>
                                    <td>{data.title}</td>
                                    <td>{data.content}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='character-details'>
                {characterDetails.map((detail, index) => (
                    detail.content && (
                        <div key={index}>
                            <h3>{detail.title}</h3>
                            {formatTextWithLineBreaks(detail.content)}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default CharacterInfo;
