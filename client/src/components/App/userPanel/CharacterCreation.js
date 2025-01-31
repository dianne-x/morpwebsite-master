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
        server_id: props.server_id // Add server ID to form data
    });

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
                setFcTypes(response.data.fcTypes || []); // Correct the state name to fcTypes
                console.log('Genders:', response.data.genders); // Debugging line
                console.log('Species:', response.data.species); // Debugging line
                console.log('Affilations:', response.data.affilations); // Debugging line
                console.log('Nationalities:', response.data.nationalities); // Debugging line
                console.log('Occupations:', response.data.occupations); // Debugging line
                console.log('FcTypes:', response.data.fcTypes); // Debugging line
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

    const handleSubmit = () => {
        if (!formData.name || !formData.gender || !formData.species || !formData.status || !formData.affilation || !formData.nationality || !formData.occupation || !formData.fc_type) {
            alert('Please fill out all required fields.');
            return;
        }

        axios.post(`${process.env.REACT_APP_PHP_BASE_URL}/saveCharacter.php`, formData)
            .then(response => {
                alert('Character saved successfully!');
                props.onCharacterSaved(response.data.character); // Notify parent component
            })
            .catch(error => {
                console.error('There was an error saving the character!', error);
            });
    };

    return (
        <div className='user-panel'>
            <h1>Character Creation</h1>
            <p>Create your character here.</p>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        {genders.map((gender) => (
                            <option key={gender.id} value={gender.gender}>{gender.gender}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Species:
                    <select name="species" value={formData.species} onChange={handleChange} required>
                        <option value="">Select Species</option>
                        {species.map((species) => (
                            <option key={species.id} value={species.species}>{species.species}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Status:
                    <select name="status" value={formData.status} onChange={handleChange} required>
                        <option value="">Select Status</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.status}>{status.status}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Affiliation:
                    <select name="affilation" value={formData.affilation} onChange={handleChange}> 
                        <option value="">Select Affiliation</option>
                        {affilations.map((affilation) => (
                            <option key={affilation.id} value={affilation.affilation}>{affilation.affilation}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Nationality:
                    <select name="nationality" value={formData.nationality} onChange={handleChange}>
                        <option value="">Select Nationality</option>
                        {nationalities.map((nationality) => (
                            <option key={nationality.id} value={nationality.nationality}>{nationality.nationality}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Occupation:
                    <select name="occupation" value={formData.occupation} onChange={handleChange}>
                        <option value="">Select Occupation</option>
                        {occupations.map((occupation) => (
                            <option key={occupation.id} value={occupation.occupation}>{occupation.occupation}</option>
                        ))}
                    </select>
                </label>
                <label>
                    FC Type:
                    <select name="fc_type" value={formData.fc_type} onChange={handleChange}> {/* Correct the field name to fc_type */}
                        <option value="">Select FC Type</option>
                        {fcTypes.map((fc) => (
                            <option key={fc.id} value={fc.fc_type}>{fc.fc_type}</option>
                        ))}
                    </select>
                </label>
                <button type="button" onClick={handleSubmit}>Save Character</button>
            </form>
            <button className="close" onClick={props.closeForm}>&times;</button>
        </div>
    );
};

export default CharacterCreation;