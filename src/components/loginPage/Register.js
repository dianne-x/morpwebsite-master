import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordAgain = () => setShowPasswordAgain(!showPasswordAgain);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://localhost/morpwebsite-master/src/php/register.php';
        const fdata = new FormData();
        fdata.append('name', name);
        fdata.append('email', email);
        fdata.append('password', password);
        fdata.append('passwordAgain', passwordAgain);

        axios.post(url, fdata)
            .then((response) => {
                const { data } = response;

                if (data.success) {
                    setMessage(data.message);
                    setErrors({}); // Clear any previous errors
                    // Optionally clear the form fields
                    setName('');
                    setEmail('');
                    setPassword('');
                    setPasswordAgain('');
                } else {
                    setErrors(data.errors || {});
                    setMessage(data.message || '');
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                setMessage('An error occurred while processing your request.');
            });
    };

    return (
        <>
            <Helmet>
                <title>MORP - Register</title>
            </Helmet>

            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="username"
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email"
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="password">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="password"
                    />
                    <button type="button" onClick={toggleShowPassword} className="show-password">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                {/* Password Again Field */}
                <div className="password">
                    <input
                        type={showPasswordAgain ? 'text' : 'password'}
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        required
                        placeholder="password again"
                    />
                    <button type="button" onClick={toggleShowPasswordAgain} className="show-password">
                        <FontAwesomeIcon icon={showPasswordAgain ? faEyeSlash : faEye} />
                    </button>
                    {errors.passwordAgain && <p style={{ color: 'red' }}>{errors.passwordAgain}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit">Register</button>

                {/* Success/Error Message */}
                {message && <p>{message}</p>}
            </form>
        </>
    );
};

export default Register;
