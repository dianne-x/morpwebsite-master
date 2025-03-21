import React from 'react';

const WantedElements = () => {
    const neededElements = [
        { name: 'Birthdate' },
        { name: 'Deathdate' },
        { name: 'Resurrected date' },
        { name: 'Species' },
        { name: 'Occupation' },
        { name: 'Affiliation' },
        { name: 'Nationality' },
        { name: 'Powers' },
        { name: 'Weaknesses' },
        { name: 'Used item' },
        { name: 'Family' },
        { name: 'Universe' },
        { name: 'Fan Cast' },
    ]
    return (
        <div>
            <h1>Wanted Elements</h1>
            <p>In this section you can decide...</p>
            <form>
                {neededElements.map((element, index) => (
                    <div key={index} className='needed-element'>
                        <label htmlFor={element.name}>{element.name}</label>
                        <input type='checkbox' id={element.name} name={element.name} />
                    </div>
                ))}
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    );
};

export default WantedElements;