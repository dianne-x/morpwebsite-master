import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterEdit = (props) => {
    const [genders, setGenders] = useState([]);
    const [species, setSpecies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [affilations, setAffilations] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [fcTypes, setFcTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        species: '',
        status: '',
        affilation: '',
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
        universe: ''
    });
    const [tempProfilePic, setTempProfilePic] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterCreation.php`)
            .then(response => {
                setGenders(response.data.genders || []);
                setSpecies(response.data.species || []);
                setStatuses(response.data.statuses || []);
                setAffilations(response.data.affilations || []);
                setNationalities(response.data.nationalities || []);
                setOccupations(response.data.occupations || []);
                setFcTypes(response.data.fc_types || []);
            })
            .catch(error => {
                console.error('There was an error fetching the character data!', error);
            });

        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacter.php?characterId=${props.characterId}`)
            .then(response => {
                const character = response.data.character;
                setFormData({
                    name: character.character_name,
                    gender: character.gender_id,
                    species: character.species_id,
                    status: character.status_id,
                    affilation: character.affilation_id,
                    nationality: character.nationality_id,
                    occupation: character.occupation_id,
                    fc_type: character.fc_type_id,
                    fc_name: character.fc_name,
                    user_id: JSON.parse(localStorage.getItem('morp-login-user')),
                    character_pic_path: character.character_pic_path || '',
                    birthdate: character.birthdate,
                    died: character.died ? true : false,
                    deathdate: character.deathdate,
                    resurrected: character.resurrected ? true : false,
                    resurrected_date: character.resurrected_date,
                    bio: character.bio,
                    powers: character.powers,
                    weaknesses: character.weaknesses,
                    used_item: character.used_item,
                    family: character.family,
                    universe: character.universe
                });
                setTempProfilePic(`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${character.character_pic_path}`);
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

    const handleSubmit = () => {
        if (!formData.name || !formData.gender || !formData.species || !formData.status || !formData.affilation || !formData.nationality || !formData.occupation || !formData.fc_type) {
            alert('Please fill out all required fields.');
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (profilePicFile) {
            formDataToSend.append('character_pic_path', profilePicFile);
        } else {
            formDataToSend.append('character_pic_path', tempProfilePic);
        }

        // Set is_verified to 0
        formDataToSend.append('is_verified', 0);

        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/updateCharacter.php`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert('Character updated successfully!');
                    props.onCharacterUpdated(response.data.character);
                } else {
                    console.error('Error updating character:', response.data.error);
                }
            })
            .catch(error => {
                console.error('There was an error updating the character!', error);
            });
    };

    return (
        <div className='user-panel character-edit'>
            <div></div>
            <div className='character-container'>
                <h1>Edit Character</h1>
                <div className='form-wrapper'>
                    <form>
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
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                        <label>
                            Gender:
                        </label>
                        <select name="gender" value={formData.gender || ''} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>{gender.gender}</option>
                            ))}
                        </select>
                        <label>
                            Species:
                        </label>
                        <select name="species" value={formData.species || ''} onChange={handleChange} required>
                            <option value="">Select Species</option>
                            {species.map((species) => (
                                <option key={species.id} value={species.id}>{species.species}</option>
                            ))}
                        </select>
                        <label>
                            Status:
                        </label>
                        <select name="status" value={formData.status || ''} onChange={handleChange} required>
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>{status.status}</option>
                            ))}
                        </select>
                        <label>
                            Affiliation:
                        </label>
                        <select name="affilation" value={formData.affilation || ''} onChange={handleChange}> 
                            <option value="">Select Affiliation</option>
                            {affilations.map((affilation) => (
                                <option key={affilation.id} value={affilation.id}>{affilation.affilation}</option>
                            ))}
                        </select>
                        <label>
                            Nationality:
                        </label>
                            <select name="nationality" value={formData.nationality || ''} onChange={handleChange}>
                                <option value="">Select Nationality</option>
                                {nationalities.map((nationality) => (
                                    <option key={nationality.id} value={nationality.id}>{nationality.nationality}</option>
                                ))}
                            </select>
                        <label>
                            Occupation:
                        </label>
                            <select name="occupation" value={formData.occupation || ''} onChange={handleChange}>
                                <option value="">Select Occupation</option>
                                {occupations.map((occupation) => (
                                    <option key={occupation.id} value={occupation.id}>{occupation.occupation}</option>
                                ))}
                            </select>
                        
                        <label>
                            Birthdate:
                        </label>
                        <input type="date" name="birthdate" value={formData.birthdate || ''} onChange={handleChange} />
                        <label>
                            Died:
                        </label>
                        <input type="checkbox" name="died" checked={formData.died} onChange={handleChange} />
                        {formData.died && (
                            <>
                                <label>
                                    Deathdate:
                                </label>
                                <input type="date" name="deathdate" value={formData.deathdate || ''} onChange={handleChange} />
                                <label>
                                    Resurrected:
                                </label>
                                <input type="checkbox" name="resurrected" checked={formData.resurrected} onChange={handleChange} />
                                {formData.resurrected && (
                                    <>
                                        <label>
                                            Resurrected Date:
                                        </label>
                                        <input type="date" name="resurrected_date" value={formData.resurrected_date || ''} onChange={handleChange} />
                                    </>
                                )}
                            </>
                        )}
                        <label>
                            Bio:
                        </label>
                        <textarea name="bio" value={formData.bio || ''} onChange={handleChange}></textarea>
                        <label>
                            Powers:
                        </label>
                        <textarea name="powers" value={formData.powers || ''} onChange={handleChange}></textarea>
                        <label>
                            Weaknesses:
                        </label>
                        <textarea name="weaknesses" value={formData.weaknesses || ''} onChange={handleChange}></textarea>
                        <label>
                            Used Item:
                        </label>
                        <textarea name="used_item" value={formData.used_item || ''} onChange={handleChange}></textarea>
                        <label>
                            Family:
                        </label>
                        <textarea name="family" value={formData.family || ''} onChange={handleChange}></textarea>
                        <label>
                            Universe:
                        </label>
                        <input type="text" name="universe" value={formData.universe || ''} onChange={handleChange}></input>
                        <label>
                            FC Type:
                        </label>
                            <select name="fc_type" value={formData.fc_type || ''} onChange={handleChange} required>
                                <option value="">Select FC Type</option>
                                {fcTypes.map((fc) => (
                                    <option key={fc.id} value={fc.id}>{fc.fc_type}</option>
                                ))}
                            </select>
                        {formData.fc_type && (
                            <>
                                <label htmlFor="fc_name">
                                    FC Name:
                                </label>
                                <input type="text" name="fc_name" value={formData.fc_name || ''} onChange={handleChange} required />
                            </>
                        )}
                        <button type="button" className='save-character-btn' onClick={handleSubmit}>Save Character</button>
                    </form>
                </div>
                <button className="close" onClick={props.closeForm}>&times;</button>
            </div>
        </div>
    );
};

export default CharacterEdit;
