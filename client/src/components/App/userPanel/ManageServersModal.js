import React from 'react';
import '../../../style/App/userPanel/servermodal.scss';


const ManageUsersModal = ({ users, onClose, onRemoveUser }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Manage WebApp Servers</h2>
        <button onClick={onClose}>Close</button>
        <ul>
         
        </ul>
      </div>
    </div>
  );
};

export default ManageUsersModal;