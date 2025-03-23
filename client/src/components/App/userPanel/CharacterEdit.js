import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CharacterEdit = (props) => {
    const [genders, setGenders] = useState([]);
    const [species, setSpecies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [affiliations, setAffiliations] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [fcTypes, setFcTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        gender: '',
        species: '',
        status: '',
        affiliation: '',
        nationality: '',
        occupation: '',
        fc_type: '',
        fc_name: '',
        user_id: JSON.parse(localStorage.getItem('morp-login-user')),
        character_pic_path: '',
        birthdate: '',
        died: false,
        deathdate: '',
        resurrected: false,
        resurrected_date: '',
        bio: '',
        powers: '',
        weaknesses: '',
        used_item: '',
        family: '',
        universe: '',
        is_own_character: false,
    });
    const [tempProfilePic, setTempProfilePic] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [aliases, setAliases] = useState([]);
    const [deleteExistingAliasIds, setDeleteExistingAliasIds] = useState([]);

    const removeALias = (index, id) => {
        if (id == null) {
            setAliases(aliases.filter((_, i) => i !== index));
            return
        }
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete an existing alias?')) {
            setDeleteExistingAliasIds([...deleteExistingAliasIds, id]);
            setAliases(aliases.filter((_, i) => i !== index));
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterCreation.php`)
            .then(response => {
                setGenders(response.data.genders || []);
                setSpecies(response.data.species || []);
                setStatuses(response.data.statuses || []);
                setAffiliations(response.data.affiliations || []);
                setNationalities(response.data.nationalities || []);
                setOccupations(response.data.occupations || []);
                setFcTypes(response.data.fc_types || []);
            })
            .catch(error => {
                console.error('There was an error fetching the character data!', error);
            });

        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterData.php?characterId=${props.characterId}`)
            .then(response => {
                const character = response.data.character;
                setFormData({
                    name: character.character_name,
                    nickname: character.nickname,
                    gender: character.gender,
                    species: character.species,
                    status: character.status,
                    affiliation: character.affiliation,
                    nationality: character.nationality,
                    occupation: character.occupation,
                    fc_type: character.fc_type,
                    fc_name: character.fc_name,
                    user_id: JSON.parse(localStorage.getItem('morp-login-user')),
                    character_pic_path: character.character_pic_path || '',
                    birthdate: character.birthdate || '', // Ensure dates are properly assigned
                    died: character.died ? true : false,
                    deathdate: character.deathdate || '',
                    resurrected: character.resurrected ? true : false,
                    resurrected_date: character.resurrected_date || '',
                    bio: character.bio,
                    powers: character.powers,
                    weaknesses: character.weaknesses,
                    used_item: character.used_item,
                    family: character.family,
                    universe: character.universe
                });
                setTempProfilePic(`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${character.character_pic_path || 'character.png'}`);
                setAliases(character.aliases || []);
            })
            .catch(error => {
                console.error('There was an error fetching the character details!', error);
            });
    }, [props.characterId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (name === 'status') {
            if (value === 'Alive (Resurrected)') {
                setFormData({
                    ...formData,
                    status: value,
                    died: true,
                    resurrected: true
                });
            } else if (value === 'Deceased') {
                setFormData({
                    ...formData,
                    status: value,
                    died: true,
                    resurrected: false
                });
            } else {
                setFormData({
                    ...formData,
                    status: value,
                    died: false,
                    resurrected: false
                });
            }
        } else if (name === 'died') {
            if (checked) {
                setFormData({
                    ...formData,
                    died: true,
                    status: 'Deceased'
                });
            } else {
                setFormData({
                    ...formData,
                    died: false,
                    status: ''
                });
            }
        } else if (name === 'resurrected') {
            if (checked) {
                setFormData({
                    ...formData,
                    resurrected: true,
                    status: 'Alive (Resurrected)'
                });
            } else {
                setFormData({
                    ...formData,
                    resurrected: false,
                    status: ''
                });
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAliasChange = (index, e) => {
        const { name, value, files } = e.target;
        const newAliases = [...aliases];
        if (name === 'alias_pic') {
            const file = files[0];
            if (file) {
                newAliases[index].pic = file;
                const reader = new FileReader();
                reader.onloadend = () => {
                    newAliases[index].tempPic = reader.result;
                    setAliases(newAliases);
                };
                reader.readAsDataURL(file);
            }
        } else {
            newAliases[index].name = value;
            setAliases(newAliases);
        }
    };

    const addAlias = () => {
        setAliases([...aliases, { id: null, name: '', character_pic_path: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            aliases: aliases.map(alias => ({
                id: alias.id,
                name: alias.name,
                character_pic_path: alias.character_pic_path
            })),
            deleteExistingAliasIds
        };

        console.log('Payload:', payload);

        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/updateCharacter.php?character_id=${props.characterId}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Response:', response.data); // Log the full response for debugging
                if (response.data.success) {
                    alert(response.data.message || 'Character updated successfully!');
                    if (response.data.character) {
                        props.onCharacterUpdated(response.data.character); // Pass the updated character data to the parent component
                    } else {
                        console.error('Updated character data is missing.');
                        alert('Updated character data is missing.');
                    }
                } else {
                    console.error('Error updating character:', response.data.error);
                    alert(`Error: ${response.data.error || 'Unknown error occurred.'}`);
                }
            })
            .catch(error => {
                console.error('There was an error updating the character!', error);
                alert(`Unexpected error: ${error.message}`);
            });
    };

    return (
        <div className='user-panel character-edit'>
            <div></div>
            <div className='character-container'>
                <h1>Edit Character</h1>
                <div className='form-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <label 
                            htmlFor="character_pic_path" id="pic-label"
                            style={{backgroundImage: `url(${tempProfilePic || `${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${formData.character_pic_path || 'character.png'}`})`}}>
                        </label>
                        <input 
                            type="file"
                            name="character_pic_path"
                            id="character_pic_path"
                            onChange={handleFileChange}
                        />
                        {formData.name && (
                            <>
                                <label htmlFor="name">
                                    Name:
                                </label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </>
                        )}
                        <label>
                            Aliases:
                        </label>
                        {console.log(aliases)
                        }
                        {aliases.map((alias, index) => (
                            <div key={index} className="alias-container">
                                <label 
                                    htmlFor={`alias_pic_${index}`} id="alias-pic-label"
                                    style={{
                                        backgroundImage: `url(${alias.tempPic || `${process.env.REACT_APP_IMAGE_BASE_URL}/aliasPictures/${alias.character_pic_path || 'alias.png'}`})`
                                    }}>
                                </label>
                                <input
                                    type="file"
                                    name="alias_pic"
                                    id={`alias_pic_${index}`}
                                    onChange={(e) => handleAliasChange(index, e)}
                                    style={{ display: 'none' }}
                                />
                                <input
                                    type="text"
                                    name="alias_name"
                                    value={alias.name}
                                    onChange={(e) => handleAliasChange(index, e)}
                                    placeholder="Alias Name"
                                    required
                                />
                                <button type="button" onClick={() => removeALias(index, alias.id)} className='remove-alias-btn'>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addAlias}>Add Alias</button>
                        {formData.nickname && (
                            <>
                                <label htmlFor="nickname">
                                    Nickname:
                                </label>
                                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required/> 
                            </>
                        )}
                        {formData.gender && (
                            <>
                                <label>
                                    Gender:
                                </label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender.id} value={gender.gender}>{gender.gender}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.species && (
                            <>
                                <label>
                                    Species:
                                </label>
                                <select name="species" value={formData.species} onChange={handleChange} required>
                                    <option value="">Select Species</option>
                                    {species.map((species) => (
                                        <option key={species.id} value={species.species}>{species.species}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.status && (
                            <>
                                <label>
                                    Status:
                                </label>
                                <select name="status" value={formData.status} onChange={handleChange} required>
                                    <option value="">Select Status</option>
                                    {statuses.map((status) => (
                                        <option key={status.id} value={status.status}>{status.status}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.affiliation && (
                            <>
                                <label>
                                    Affiliation:
                                </label>
                                <select name="affiliation" value={formData.affiliation} onChange={handleChange} required>
                                    <option value="">Select Affiliation</option>
                                    {affiliations.map((affiliation) => (
                                        <option key={affiliation.id} value={affiliation.affiliation}>{affiliation.affiliation}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.nationality && (
                            <>
                                <label>
                                    Nationality:
                                </label>
                                <select name="nationality" value={formData.nationality} onChange={handleChange} required>
                                    <option value="">Select Nationality</option>
                                    {nationalities.map((nationality) => (
                                        <option key={nationality.id} value={nationality.nationality}>{nationality.nationality}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.occupation && (
                            <>
                                <label>
                                    Occupation:
                                </label>
                                <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                                    <option value="">Select Occupation</option>
                                    {occupations.map((occupation) => (
                                        <option key={occupation.id} value={occupation.occupation}>{occupation.occupation}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {formData.birthdate && (
                            <>
                                <label>
                                    Birthdate:
                                </label>
                                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required/>
                            </>
                        )}
                        <label>
                            Died:
                        </label>
                        <input type="checkbox" name="died" checked={formData.died} onChange={handleChange} disabled={formData.status === 'Alive (Resurrected)' || formData.status === 'Deceased'} />
                        {formData.died && (
                            <>
                                <label>
                                    Deathdate:
                                </label>
                                <input type="date" name="deathdate" value={formData.deathdate} onChange={handleChange} />
                                <label>
                                    Resurrected:
                                </label>
                                <input type="checkbox" name="resurrected" checked={formData.resurrected} onChange={handleChange} disabled={formData.status === 'Alive (Resurrected)'} />
                                {formData.resurrected && (
                                    <>
                                        <label>
                                            Resurrected Date:
                                        </label>
                                        <input type="date" name="resurrected_date" value={formData.resurrected_date} onChange={handleChange} />
                                    </>
                                )}
                            </>
                        )}
                        {formData.bio && (
                            <>
                                <label>
                                    Bio:
                                </label>
                                <textarea name="bio" value={formData.bio} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {formData.powers && (
                            <>
                                <label>
                                    Powers:
                                </label>
                                <textarea name="powers" value={formData.powers} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {formData.weaknesses && (
                            <>
                                <label>
                                    Weaknesses:
                                </label>
                                <textarea name="weaknesses" value={formData.weaknesses} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {formData.used_item && (
                            <>
                                <label>
                                    Used Item:
                                </label>
                                <textarea name="used_item" value={formData.used_item} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {formData.family && (
                            <>
                                <label>
                                    Family:
                                </label>
                                <textarea name="family" value={formData.family} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {formData.universe && (
                            <>
                                <label>
                                    Universe:
                                </label>
                                <input type="text" name="universe" value={formData.universe} onChange={handleChange} required></input>
                            </>
                        )}
                        {formData.fc_type && (
                        <>
                            <label>
                                FC Type:
                            </label>
                            <select name="fc_type" value={formData.fc_type} onChange={handleChange} required> {/* Correct the field name to fc_type */}
                                <option value="">Select FC Type</option>
                                {fcTypes
                                    .filter(fc => formData.is_own_character || fc.fc_type === 'Canon Cast')
                                    .map((fc) => (
                                        <option key={fc.id} value={fc.fc_type}>{fc.fc_type}</option>
                                    ))}
                            </select>
                        
                        
                            <label htmlFor="fc_name">
                                FC Name:
                            </label>
                            <input type="text" name="fc_name" value={formData.fc_name} onChange={handleChange} required />
                        </>
                        )}
                        
                        <button type="submit" className='save-character-btn'>Save Character</button>
                    </form>
                </div>
                <button className="close" onClick={props.closeForm}>&times;</button>
            </div>
        </div>
    );
};

export default CharacterEdit;
