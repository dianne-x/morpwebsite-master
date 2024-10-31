import React from "react";
import '../../../style/App/userPanel/characters.scss';

const Characters = () => {
    return (
        <>
            <h2>Characters</h2>
            <div className="character-container">
                <details>
                    <summary>Server 1</summary>
                    <div className="detail">
                        <ul>
                            <li>
                                <div className="info">
                                    <img src="http://localhost/morpwebsite-master/src/pictureData/userPictures/user.png"/>
                                    <p>Character 1</p>
                                </div>
                                <div className="modify">
                                    <button>info</button>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        </ul>
                        <button>Add new character</button>
                    </div>
                </details>
                <details>
                    <summary>Server 2</summary>
                    <div className="detail">
                        <ul>
                        </ul>
                        <button>Add new character</button>
                    </div>
                </details>
            </div>
        </>
    );
}

export default Characters;