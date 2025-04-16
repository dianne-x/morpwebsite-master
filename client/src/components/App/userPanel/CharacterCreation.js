import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../style/App/userPanel/characterForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CharacterCreation = (props) => {
    const [genders, setGenders] = useState([]);
    const [species, setSpecies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [affiliations, setAffiliations] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [fcTypes, setFcTypes] = useState([]); // Correct the state name to fcTypes
    const [formData, setFormData] = useState({
        name: '',
        nickname: '', // Add nickname to form data
        gender: '',
        species: '',
        status: '',
        affiliation: '',
        nationality: '',
        occupation: '',
        fc_type: '', // Correct the field name to fc_type
        fc_name: '', // Add fc_name to form data
        user_id: JSON.parse(localStorage.getItem('morp-login-user')), // Add user ID to form data
        server_id: props.server_id, // Add server ID to form data
        character_pic_path: 'character.png', // Add profile picture to form data
        birthdate: '', // Add birthdate to form data
        died: false, // Add died to form data
        deathdate: '', // Add deathdate to form data
        resurrected: false, // Add resurrected to form data
        resurrected_date: '', // Add resurrected_date to form data
        bio: '', // Add bio to form data
        powers: '', // Add powers to form data
        weaknesses: '', // Add weaknesses to form data
        used_item: '', // Add used_item to form data
        family: '', // Add family to form data
        universe: '', // Add universe to form data
        is_own_character: false, // Add own character to form data
    });
    const [tempProfilePic, setTempProfilePic] = useState(''); // Temporary variable for profile picture
    const [profilePicFile, setProfilePicFile] = useState(null); // File object for profile picture
    const [aliases, setAliases] = useState([]);
    const [characterNeeds, setCharacterNeeds] = useState([]); // State to store character needs

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterCreation.php`)
            .then(response => {
                //console.log('API response:', response.data); // Debugging line
                setGenders(response.data.genders || []);
                setSpecies(response.data.species || []);
                setStatuses(response.data.statuses || []);
                setAffiliations(response.data.affiliations || []);
                setNationalities(response.data.nationalities || []);
                setOccupations(response.data.occupations || []);
                setFcTypes(response.data.fc_types || []); // Correct the state name to fc_types
                //console.log('Genders:', response.data.genders); // Debugging line
                //console.log('Species:', response.data.species); // Debugging line
                //console.log('Affiliations:', response.data.affiliations); // Debugging line
                //console.log('Nationalities:', response.data.nationalities); // Debugging line
                //console.log('Occupations:', response.data.occupations); // Debugging line
                //console.log('FcTypes:', response.data.fc_types); // Debugging line
            })
            .catch(error => {
                console.error('There was an error fetching the character data!', error);
            });
    }, []);

    useEffect(() => {
        // Fetch character needs from the server
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/characterWantedElements.php?serverId=${props.server_id}`)
            .then(response => {
                if (response.data.success) {
                    const needs = Object.entries(response.data.data)
                        .filter(([_, value]) => value === 1) // Filter fields where the column value is 1
                        .map(([key]) => key);
                    setCharacterNeeds(needs);
                }
            })
            .catch(error => console.error('Error fetching character needs:', error));
    }, [props.server_id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value || null // Default to null if no value is selected
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
                    status: value || null, // Default to null
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
            setProfilePicFile(file); // Set the file object
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfilePic(reader.result); // Set the temporary profile picture
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
        setAliases([...aliases, { name: '', pic: null, tempPic: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('Form data before submission:', formData);
        

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (profilePicFile) {
            formDataToSend.append('character_pic_path', profilePicFile); // Append the file object
        } else {
            formDataToSend.append('character_pic_path', tempProfilePic); // Append the temporary profile picture
        }

        formDataToSend.append('aliases', JSON.stringify(aliases.map(alias => ({ name: alias.name }))));
        aliases.forEach((alias, index) => {
            if (alias.pic) {
                formDataToSend.append(`alias_pics[${index}]`, alias.pic);
            }
        });

        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/saveCharacter.php`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert('Character saved successfully!');
                props.onCharacterSaved(response.data.character); // Notify parent component
            })
            .catch(error => {
                console.error('There was an error saving the character!', error);
            });
    };

    return (
        <div className='user-panel character-creation'>
            <div></div>
            <div className='character-container'>
                <h1>Character Creation</h1>
                <div className='form-wrapper'>
                    <form onSubmit={handleSubmit}>
                        <label 
                            htmlFor="character_pic_path" id="pic-label"
                            style={{backgroundImage: `url(${tempProfilePic || `${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${formData.character_pic_path}`})`}}>
                        </label>
                        <input 
                            type="file"
                            name="character_pic_path"
                            id="character_pic_path"
                            onChange={handleFileChange}
                        />
                        <label>
                            Own Character:
                        </label>
                        <input type="checkbox" name="is_own_character" checked={formData.is_own_character} onChange={handleChange} />
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        <label>
                            Aliases:
                        </label>
                        {aliases.map((alias, index) => (
                            <div key={index} className="alias-container">
                                <label 
                                    htmlFor={`alias_pic_${index}`} id="alias-pic-label"
                                    style={{
                                        backgroundImage: `url(${alias.tempPic || `${process.env.REACT_APP_IMAGE_BASE_URL}/aliasPictures/alias.png`})`,
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
                                <button type="button" onClick={() => setAliases(aliases.filter((_, i) => i !== index))} className='remove-alias-btn'>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        ))}
                        {
                            aliases.length < 4 && 
                            <button type="button" className='save-character-btn' onClick={addAlias}>Add Alias</button>
                        }
                        <label htmlFor="nickname">
                            Nickname:
                        </label>
                        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
                        <label>
                            Gender:
                        </label>
                        <select name="gender" value={formData.gender || ''} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.gender}>{gender.gender}</option>
                            ))}
                        </select>
                        {characterNeeds.includes('species_need') && (
                            <>
                                <label>Species:</label>
                                <select name="species" value={formData.species || ''} onChange={handleChange} required>
                                    <option value="">Select Species</option>
                                    {species.map((species) => (
                                        <option key={species.id} value={species.species}>{species.species}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        <label>
                            Status:
                        </label>
                        <select name="status" value={formData.status || ''} onChange={handleChange} required>
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.status}>{status.status}</option>
                            ))}
                        </select>
                        {characterNeeds.includes('affiliation_need') && (
                            <>
                                <label>Affiliation:</label>
                                <select name="affiliation" value={formData.affiliation || ''} onChange={handleChange}>
                                    <option value="">Select Affiliation</option>
                                    {affiliations.map((affiliation) => (
                                        <option key={affiliation.id} value={affiliation.affiliation}>{affiliation.affiliation}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {characterNeeds.includes('nationality_need') && (
                            <>
                                <label>Nationality:</label>
                                <select name="nationality" value={formData.nationality || ''} onChange={handleChange} required>
                                    <option value="">Select Nationality</option>
                                    {nationalities.map((nationality) => (
                                        <option key={nationality.id} value={nationality.nationality}>{nationality.nationality}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {characterNeeds.includes('occupation_need') && (
                            <>
                                <label>Occupation:</label>
                                <select name="occupation" value={formData.occupation || ''} onChange={handleChange} required>
                                    <option value="">Select Occupation</option>
                                    {occupations.map((occupation) => (
                                        <option key={occupation.id} value={occupation.occupation}>{occupation.occupation}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        {characterNeeds.includes('birthdate_need') && (
                            <>
                                <label>Birthdate:</label>
                                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                            </>
                        )}
                        {characterNeeds.includes('deathdate_need') && (
                            <>
                                <label>Died:</label>
                                <input type="checkbox" name="died" checked={formData.died} onChange={handleChange} disabled={formData.status === 'Alive (Resurrected)' || formData.status === 'Deceased'} />
                                {formData.died && (
                                    <>
                                        <label>Deathdate:</label>
                                        <input type="date" name="deathdate" value={formData.deathdate} onChange={handleChange} required />
                                    </>
                                )}
                            </>
                        )}
                        {characterNeeds.includes('resurrected_date_need') && formData.died && (
                            <>
                                <label>Resurrected:</label>
                                <input type="checkbox" name="resurrected" checked={formData.resurrected} onChange={handleChange} disabled={formData.status === 'Alive (Resurrected)'} />
                                {formData.resurrected && (
                                    <>
                                        <label>Resurrected Date:</label>
                                        <input type="date" name="resurrected_date" value={formData.resurrected_date} onChange={handleChange} required />
                                    </>
                                )}
                            </>
                        )}
                        <label>
                            Bio:
                        </label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} required></textarea>
                        {characterNeeds.includes('powers_need') && (
                            <>
                                <label>Powers:</label>
                                <textarea name="powers" value={formData.powers} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {characterNeeds.includes('weaknesses_need') && (
                            <>
                                <label>Weaknesses:</label>
                                <textarea name="weaknesses" value={formData.weaknesses} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {characterNeeds.includes('used_item_need') && (
                            <>
                                <label>Used Item:</label>
                                <textarea name="used_item" value={formData.used_item} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {characterNeeds.includes('family_need') && (
                            <>
                                <label>Family:</label>
                                <textarea name="family" value={formData.family} onChange={handleChange} required></textarea>
                            </>
                        )}
                        {characterNeeds.includes('universe_need') && (
                            <>
                                <label>Universe:</label>
                                <input type="text" name="universe" value={formData.universe} onChange={handleChange} required></input>
                            </>
                        )}
                        {characterNeeds.includes('fc_need') && (
                            <>
                                <label>FC Type:</label>
                                <select name="fc_type" value={formData.fc_type || ''} onChange={handleChange} required> {/* Correct the field name to fc_type */}
                                    <option value="">Select FC Type</option>
                                    {fcTypes
                                        .filter(fc => formData.is_own_character || fc.fc_type === 'Canon Cast')
                                        .map((fc) => (
                                            <option key={fc.id} value={fc.fc_type}>{fc.fc_type}</option>
                                        ))}
                                </select>
                                {formData.fc_type && (
                                    <>
                                        <label htmlFor="fc_name">
                                            FC Name:
                                        </label>
                                        <input type="text" name="fc_name" value={formData.fc_name} onChange={handleChange} required />
                                    </>
                                )}
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

export default CharacterCreation;