import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgian] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
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
                        type={showPassword ? 'text' : 'password'}
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgian(e.target.value)}
                        required
                        placeholder='password again'
                    />
                    <button type="button" onClick={toggleShowPassword} className='show-password'>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                
                <button type="submit">Register</button>
            </form>
        </>
    );

};

export default Register;