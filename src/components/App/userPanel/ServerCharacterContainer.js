import React from 'react';
import CharacterTile from "./CharacterTile";

const ServerCharacterContainer = (props) => {
    return (
        <details open={true}>
            <summary>{props.name} ({props.id})</summary>
            <div className="detail">
                <ul>
                    <CharacterTile 
                        uid="1"
                        name="Character 1"
                        pic_path="user.png"
                        verified={true}
                    />
                    <CharacterTile 
                        uid="2"
                        name="Character 2"
                        pic_path="user.png"
                        verified={false}
                    />
                </ul>
                <button className="addnew-char">
                    + Add new character
                </button>
            </div>
        </details>
    );
};

export default ServerCharacterContainer;