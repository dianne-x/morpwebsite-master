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

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordAgain = () => setShowPasswordAgain(!showPasswordAgain);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const url = 'http://localhost/morpwebsite-master/src/php/register.php';
        const fdata = new FormData();
        fdata.append('name', name);
        fdata.append('email', email);
        fdata.append('password', password);

        axios.post(url, fdata)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    

    // EZT A FUNCTIONT MÉG CSISZOLNI KELL

    function areCredentialsValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isNameValid = name.length >= 4;
        const isPasswordStrong = isPasswordStrong(password);
        const arePasswordsEqual = password === passwordAgain;

        return isEmailValid && isNameValid && isPasswordStrong && arePasswordsEqual;
    }

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