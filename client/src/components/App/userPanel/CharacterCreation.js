import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterCreation = (props) => {
    const [genders, setGenders] = useState([]);
    const [species, setSpecies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [affilations, setAffilations] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [fcTypes, setFcTypes] = useState([]); // Correct the state name to fcTypes
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        species: '',
        status: '',
        affilation: '',
        nationality: '',
        occupation: '',
        fc_type: '', // Correct the field name to fc_type
        user_id: JSON.parse(localStorage.getItem('morp-login-user')), // Add user ID to form data
        server_id: props.server_id, // Add server ID to form data
        character_pic_path: null // Add profile picture to form data
    });
    const [tempProfilePic, setTempProfilePic] = useState(''); // Temporary variable for profile picture
    const [profilePicFile, setProfilePicFile] = useState(null); // File object for profile picture

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterCreation.php`)
            .then(response => {
                console.log('API response:', response.data); // Debugging line
                setGenders(response.data.genders || []);
                setSpecies(response.data.species || []);
                setStatuses(response.data.statuses || []);
                setAffilations(response.data.affilations || []);
                setNationalities(response.data.nationalities || []);
                setOccupations(response.data.occupations || []);
                setFcTypes(response.data.fc_types || []); // Correct the state name to fc_types
                console.log('Genders:', response.data.genders); // Debugging line
                console.log('Species:', response.data.species); // Debugging line
                console.log('Affilations:', response.data.affilations); // Debugging line
                console.log('Nationalities:', response.data.nationalities); // Debugging line
                console.log('Occupations:', response.data.occupations); // Debugging line
                console.log('FcTypes:', response.data.fc_types); // Debugging line
            })
            .catch(error => {
                console.error('There was an error fetching the character data!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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

    const handleSubmit = () => {
        if (!formData.name || !formData.gender || !formData.species || !formData.status || !formData.affilation || !formData.nationality || !formData.occupation || !formData.fc_type) {
            alert('Please fill out all required fields.');
            return;
        }

        console.log('Form data:', formData); // Debugging line

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (profilePicFile) {
            formDataToSend.append('character_pic_path', profilePicFile); // Append the file object
        } else {
            formDataToSend.append('character_pic_path', tempProfilePic); // Append the temporary profile picture
        }

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
            <div>
                <h1>Character Creation</h1>
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
                    <label for="name">
                        Name:
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <label>
                        Gender:
                    </label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                            <option key={gender.id} value={gender.gender}>{gender.gender}</option>
                        ))}
                    </select>
                    <label>
                        Species:
                    </label>
                    <select name="species" value={formData.species} onChange={handleChange} required>
                        <option value="">Select Species</option>
                        {species.map((species) => (
                            <option key={species.id} value={species.species}>{species.species}</option>
                        ))}
                    </select>
                    <label>
                        Status:
                    </label>
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.status}>{status.status}</option>
                        ))}
                    </select>
                    <label>
                        Affiliation:
                    </label>
                    <select name="affilation" value={formData.affilation} onChange={handleChange}> 
                        <option value="">Select Affiliation</option>
                        {affilations.map((affilation) => (
                            <option key={affilation.id} value={affilation.affilation}>{affilation.affilation}</option>
                        ))}
                    </select>
                    <label>
                        Nationality:
                    </label>
                        <select name="nationality" value={formData.nationality} onChange={handleChange}>
                            <option value="">Select Nationality</option>
                            {nationalities.map((nationality) => (
                                <option key={nationality.id} value={nationality.nationality}>{nationality.nationality}</option>
                            ))}
                        </select>
                    <label>
                        Occupation:
                    </label>
                        <select name="occupation" value={formData.occupation} onChange={handleChange}>
                            <option value="">Select Occupation</option>
                            {occupations.map((occupation) => (
                                <option key={occupation.id} value={occupation.occupation}>{occupation.occupation}</option>
                            ))}
                        </select>
                    <label>
                        FC Type:
                    </label>
                        <select name="fc_type" value={formData.fc_type} onChange={handleChange}> {/* Correct the field name to fc_type */}
                            <option value="">Select FC Type</option>
                            {fcTypes.map((fc) => (
                                <option key={fc.id} value={fc.fc_type}>{fc.fc_type}</option>
                            ))}
                        </select>
                    <button type="button" onClick={handleSubmit}>Save Character</button>
                </form>
                <button className="close" onClick={props.closeForm}>&times;</button>
            </div>
        </div>
    );
};

export default CharacterCreation;