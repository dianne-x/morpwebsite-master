import React, { useState, useEffect } from 'react';
import CharacterTile from "./CharacterTile";
import CharacterCreation from './CharacterCreation';
import CharacterEdit from './CharacterEdit';

const ServerCharacterContainer = (props) => {
    const [characters, setCharacters] = useState([]);
    const userId = JSON.parse(localStorage.getItem('morp-login-user')); // Parse the user ID from localStorage
    const [characterCreationOpen, setCharacterCreationOpen] = useState(false);
    const [refreshCharacters, setRefreshCharacters] = useState(false); // State variable to trigger refresh
    const [characterEditOpen, setCharacterEditOpen] = useState(false);
    const [characterToEdit, setCharacterToEdit] = useState(null);

    const fetchCharacters = () => {
        console.log(`Fetching server members and characters for userId: ${userId} and serverId: ${props.id}`);
        
        // Verify userId
        if (!userId) {
            console.error('No user token found in localStorage');
            return;
        }
        
        const fetchUrl = `${process.env.REACT_APP_PHP_BASE_URL}/getServerMember.php?userId=${userId}&serverId=${props.id}`;
        console.log(`Fetch URL: ${fetchUrl}`);
        
        // Fetch server members and characters for the logged-in user
        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData.error) {
                    console.error('Error:', responseData.error);
                    return;
                }
                console.log('Characters fetched:', responseData.data);
                setCharacters(responseData.data);
                
            })
            .catch(error => console.error('Error fetching server members and characters:', error));
    };

    useEffect(() => {
        fetchCharacters();
    }, [props.id, userId, refreshCharacters]); // Add refreshCharacters to the dependency array

    const handleDelete = (characterId) => {
        const deleteUrl = `${process.env.REACT_APP_PHP_BASE_URL}/deleteCharacter.php?characterId=${characterId}`;
        console.log(`Delete URL: ${deleteUrl}`);
        
        fetch(deleteUrl, { method: 'DELETE' })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.error) {
                    console.error('Error:', responseData.error);
                    return;
                }
                console.log('Delete Response:', responseData);
                // Remove the deleted character from the state
                setCharacters(characters.filter(character => character.id !== characterId));
                setRefreshCharacters(!refreshCharacters); // Toggle the state to trigger refresh
            })
            .catch(error => console.error('Error deleting character:', error));
    };

    const handleEdit = (characterId) => {
        setCharacterToEdit(characterId);
        setCharacterEditOpen(true);
    };

    const handleCharacterSaved = (newCharacter) => {
        setCharacters([...characters, newCharacter]);
        setCharacterCreationOpen(false);
        setRefreshCharacters(!refreshCharacters); // Toggle the state to trigger refresh
    };

    const handleCharacterUpdated = (updatedCharacter) => {
        if (updatedCharacter && updatedCharacter.id) {
            setCharacters(characters.map(character => character.id === updatedCharacter.id ? updatedCharacter : character));
            setCharacterEditOpen(false);
            setRefreshCharacters(!refreshCharacters);
        } else {
            console.error('Updated character data is invalid:', updatedCharacter);
        }
    };

    return (
        <>
            <details open={(characters.length > 0 ? true : false)}>
                <summary>{props.name}</summary>
                <div className="detail">
                    <ul>
                        {characters.length > 0 ? (
                            characters.map(character => (
                                character && character.id ? (
                                    <CharacterTile 
                                        key={character.id}
                                        uid={character.id}
                                        name={character.character_name}
                                        pic_path={character.character_pic_path || 'character.png'}
                                        verified={character.is_verified}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit} // Add handleEdit
                                    />
                                ) : null
                            ))
                        ) : (
                            <li>No characters found</li>
                        )}
                    </ul>
                    <button className="addnew-char" onClick={() => setCharacterCreationOpen(true)}>
                        + Add new character
                    </button>
                </div>
            </details>
            {characterCreationOpen && (
                <CharacterCreation 
                    server_id={props.id} 
                    closeForm={() => setCharacterCreationOpen(false)} 
                    onCharacterSaved={handleCharacterSaved} // Pass the handler
                />
            )}
            {characterEditOpen && (
                <CharacterEdit 
                    characterId={characterToEdit}
                    server_id={props.id} 
                    closeForm={() => setCharacterEditOpen(false)} 
                    onCharacterUpdated={handleCharacterUpdated}
                />
            )}
        </>
    );
};

export default ServerCharacterContainer;