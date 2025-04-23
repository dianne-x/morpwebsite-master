import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connectWebSocket } from '../../utils/websocket';

const UserLogin = ({ changeLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(checkLogin());
    const wsRef = useRef(null); // WebSocket reference

    function checkLogin() {
        return localStorage.getItem('morp-login-user') !== null && localStorage.getItem('morp-login-user') !== 'undefined';
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/app');
        }
    }, [loggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        changeLoading(true);
        const url = `${process.env.REACT_APP_PHP_BASE_URL}/login.php`;
        const fdata = new FormData();
        fdata.append('email', email);
        fdata.append('password', password);
      
        axios.post(url, fdata)
          .then((response) => {
            const { data } = response;
      
            if (data.success) {
              setErrorMessage('');
              localStorage.setItem('morp-login-user', JSON.stringify(data.uid));
              setLoggedIn(true);
      
              // Establish WebSocket connection
              //console.log('Login successful, connecting to WebSocket...');
              connectWebSocket(data.uid);
            } else {
              changeLoading(false);
              setErrorMessage(data.message || 'An error occurred while processing your request.');
            }
          })
          .catch((error) => {
            changeLoading(false);
            console.error('Error:', error);
            setErrorMessage('An error occurred while processing your request.');
          });
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
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default UserLogin;