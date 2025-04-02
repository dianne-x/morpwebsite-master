import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/Character/CharacterInfo.scss';
import formatTextWithLineBreaks from '../../FormatTextWithLineBreaks';

const CharacterInfo = ({ characterId, onClose, name, picture }) => {
    const [characterInfo, setCharacterInfo] = useState(null);
    const [selectedPicMap, setSelectedPicMap] = useState('character');

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

    const characterPictureMap = {
        'character': `${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${picture || 'character.png'}`,
        ...characterInfo.aliases.reduce((acc, alias) => {
            acc[alias.id] = `${process.env.REACT_APP_IMAGE_BASE_URL}/aliasPictures/${alias.character_pic_path || 'alias.png'}`;
            return acc;
        }, {})
    };

    // Log the object for debugging
    console.log('Character Picture Map:', characterPictureMap);

    const characterDataTable = [
        { title: 'Nickname', content: characterInfo.nickname },
        { title: 'Gender', content: characterInfo.gender },
        { title: 'Species', content: characterInfo.species },
        { title: 'Status', content: characterInfo.status },
        { title: 'Affiliation', content: characterInfo.affiliation },
        { title: 'Nationality', content: characterInfo.nationality },
        { title: 'Occupation', content: characterInfo.occupation },
        { title: 'Birthdate', content: characterInfo.birthdate || 'unknown date' },
        characterInfo.fc_name && { 
            title: 'FC', 
            content: `${characterInfo.fc_name} (${characterInfo.fc_type || 'unknown type'})` 
        },
        { title: 'Died', content: characterInfo.died != 0 ? (characterInfo.deathdate || 'unknown date') : null },
        { title: 'Resurrected', content: characterInfo.resurrected != 0 ? (characterInfo.resurrected_date || 'unknown date') : null }
    ].filter(Boolean); // Filter out null or undefined entries

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
                    <img src={characterPictureMap[selectedPicMap]} alt="Character Icon" />
                    <h2
                        style={{ textWrap: 'wrap' }}
                        onClick={() => setSelectedPicMap("character")} 
                        className={selectedPicMap === "character" ? "selected" : ""}>
                        {name}
                    </h2>
                    {characterInfo && characterInfo.aliases.length > 0 &&
                    <ul>
                        <li>Aliases:</li>
                        {
                            characterInfo.aliases
                                .sort((a, b) => b.name.length - a.name.length) // Sort aliases by name length in descending order
                                .map((alias, index) => (
                                    <li key={index} onClick={() => setSelectedPicMap(alias.id)}>
                                        <p className={selectedPicMap === alias.id ? "selected" : ""}>{alias.name}</p>
                                    </li>
                                ))
                        }
                    </ul>}
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
                        {characterInfo.died != 0 &&
                            <tr>
                                <td>Died</td>
                                <td>{characterInfo.deathdate || 'unknown date'}</td>
                            </tr>
                        }
                        {characterInfo.resurrected != 0 &&
                            <tr>
                                <td>Resurrected</td>
                                <td>{characterInfo.resurrected_date || 'unknown date'}</td>
                            </tr>
                        }
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
