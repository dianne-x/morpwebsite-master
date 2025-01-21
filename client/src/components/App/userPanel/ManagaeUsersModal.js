import React from 'react';
import '../../../style/App/userPanel/modal.scss';


const ManageUsersModal = ({ users, onClose, onRemoveUser }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Manage WebApp Users</h2>
        <button onClick={onClose}>Close</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => onRemoveUser(user.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsersModal;