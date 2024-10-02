import React from 'react';

const PasswordSpecs = () => {
    return (
        <div className='password-specs'>
            <h3>Password requirements</h3>
            <ul>
                <li>At least 8 characters long</li>
                <li>Contains both uppercase and lowercase letters</li>
                <li>Includes at least one number</li>
                <li>Has at least one special character</li>
            </ul>
        </div>
    );
};

export default PasswordSpecs;