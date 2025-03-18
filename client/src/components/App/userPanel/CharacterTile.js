import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CharacterTile = (props) => {
    return (
        <li className={(!props.verified ? "not-verified" : "")}>
            <div className="info">
                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/characterPictures/${props.pic_path}`}/>
                <p>{props.name}</p>
            </div>
            <div className="modify">
                <button title="info" className="info" onClick={() => props.handleInfo(props.uid, props.name, props.pic_path)}><FontAwesomeIcon icon={faInfoCircle} /></button>
                <button title="edit" className="edit" onClick={() => (props.handleEdit(props.uid))}><FontAwesomeIcon icon={faEdit} /></button>
                <button title="delete" className="delete" onClick={() => (props.handleDelete(props.uid))}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </li>
    );
};

export default CharacterTile;