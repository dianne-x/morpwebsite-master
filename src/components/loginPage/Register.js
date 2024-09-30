import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgian] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //axios.post('http://localhost:3000/', {name, email, password})
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordAgain = () => setShowPasswordAgain(!showPasswordAgain);

    return (
        <>
            <Helmet>
            <title>MORP - Register</title>
            </Helmet>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='username'
                    />
                </div>
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
                <div className='password'>
                    <input
                        type={showPasswordAgain ? 'text' : 'password'}
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgian(e.target.value)}
                        required
                        placeholder='password again'
                    />
                    <button type="button" onClick={toggleShowPasswordAgain} className='show-password'>
                        <FontAwesomeIcon icon={showPasswordAgain ? faEyeSlash : faEye} />
                    </button>
                </div>
                
                <button type="submit">Register</button>
            </form>
        </>
    );

};

export default Register;