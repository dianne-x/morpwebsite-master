import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterCreation = (props) => {
    const [genders, setGenders] = useState([]);
    const [species, setSpecies] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        species: '',
        status: '',
        user_id: JSON.parse(localStorage.getItem('morp-login-user')), // Add user ID to form data
        server_id: props.server_id // Add server ID to form data
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PHP_BASE_URL}/getCharacterCreation.php`)
            .then(response => {
                setGenders(response.data.genders);
                setSpecies(response.data.species);
                setStatuses(response.data.statuses);
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
        if (!formData.name || !formData.gender || !formData.species || !formData.status) {
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
                        {species.map((specie) => (
                            <option key={specie.id} value={specie.specie}>{specie.specie}</option>
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
                <button type="button" onClick={handleSubmit}>Save Character</button>
            </form>
            <button className="close" onClick={props.closeForm}>&times;</button>
        </div>
    );
};

export default CharacterCreation;