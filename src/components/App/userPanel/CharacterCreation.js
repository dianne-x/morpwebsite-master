import React from 'react';

const CharacterCreation = (props) => {
    return (
        <div className='user-panel'>
            <h1>Character Creation</h1>
            <p>Create your character here.</p>

            <button className="close" onClick={props.closeForm}>&times;</button>
        </div>
    );
};

export default CharacterCreation;