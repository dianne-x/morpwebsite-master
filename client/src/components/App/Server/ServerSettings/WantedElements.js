import React, { useEffect, useState } from 'react';

const WantedElements = ({ serverId }) => {
    const [neededElements, setNeededElements] = useState([
        { name: 'Birthdate', field_name: 'birthdate_need', value: 0 },
        { name: 'Deathdate', field_name: 'deathdate_need', value: 0 },
        { name: 'Resurrected date', field_name: 'resurrected_date_need', value: 0 },
        { name: 'Species', field_name: 'species_need', value: 0 },
        { name: 'Occupation', field_name: 'occupation_need', value: 0 },
        { name: 'Affiliation', field_name: 'affiliation_need', value: 0 },
        { name: 'Nationality', field_name: 'nationality_need', value: 0 },
        { name: 'Powers', field_name: 'powers_need', value: 0 },
        { name: 'Weaknesses', field_name: 'weaknesses_need', value: 0 },
        { name: 'Used item', field_name: 'used_item_need', value: 0 },
        { name: 'Family', field_name: 'family_need', value: 0 },
        { name: 'Universe', field_name: 'universe_need', value: 0 },
        { name: 'Fan Cast', field_name: 'fc_need', value: 0 }
    ]);

    useEffect(() => {
        // Fetch data from the server
        fetch(`${process.env.REACT_APP_PHP_BASE_URL}/characterWantedElements.php?serverId=${serverId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setNeededElements(prevElements =>
                        prevElements.map(element => ({
                            ...element,
                            value: data.data[element.field_name] || 0
                        }))
                    );
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [serverId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = neededElements.reduce((acc, element) => {
            acc[element.field_name] = element.value;
            return acc;
        }, {});

        // Update data on the server
        fetch(`${process.env.REACT_APP_PHP_BASE_URL}/characterWantedElements.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serverId, fields })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Changes saved successfully.');
                } else {
                    alert('Failed to save changes.');
                }
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const handleCheckboxChange = (index) => {
        setNeededElements(prevElements =>
            prevElements.map((element, i) =>
                i === index ? { ...element, value: element.value === 1 ? 0 : 1 } : element
            )
        );
    };

    return (
        <div>
            <h1>Wanted Elements</h1>
            <p>In this section you can decide...</p>
            <form onSubmit={handleSubmit}>
                {neededElements.map((element, index) => (
                    <div key={index} className='needed-element'>
                        <label htmlFor={element.field_name}>{element.name}</label>
                        <input
                            type='checkbox'
                            id={element.field_name}
                            name={element.field_name}
                            checked={element.value === 1}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </div>
                ))}
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    );
};

export default WantedElements;