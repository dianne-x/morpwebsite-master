import React, {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ResendPassword = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
    };

    return (
        <HelmetProvider>
            <Helmet>
              <title>MORP - Resend Password</title>
            </Helmet>
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
                <button type="submit">Resend Password</button>
            </form>
        </HelmetProvider>
    );
};

export default ResendPassword;