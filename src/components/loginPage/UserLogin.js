import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const url = 'http://localhost/morpwebsite-master/src/php/register.php';
        const fdata = new FormData();
        fdata.append('email', email);
        fdata.append('password', password);

        axios.post(url, fdata)
            .then((response) => {
                
            })
    };

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='email'
                    />
                </div>
                <div className='password'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='password'
                    />
                    <button type="button" onClick={toggleShowPassword} className='show-password'>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default UserLogin;