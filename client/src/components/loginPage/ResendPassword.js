import React, {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

const ResendPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_PHP_BASE_URL}/newPasswordRequest.php`;
        const fdata = new FormData();
        fdata.append('email', email);

        axios.post(url, fdata)
            .then((response) => {
                const { data } = response;
                
                setMessage(data.message);
                setEmailSent(data.success);
            })
            .catch((error) => {
                console.log('Error:', error);
                setMessage('An error occurred while processing your request.');
            });
    };

    return (
        <HelmetProvider>
            <Helmet>
              <title>MORP - Resend Password</title>
            </Helmet>
            {
            !emailSent 
            ?
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
                {message && <p style={{color: 'red'}}>{message}</p>}
                <button type="submit">Resend Password</button>
            </form>
            :
            <div>
                <p>{message}</p>
            </div>
            }
            
        </HelmetProvider>
    );
};

export default ResendPassword;