import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../../style/Home/Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import morpLike from '../../img/MORP_Like.webp';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending message...');

        const { name, email, message } = formData;
        const body = `
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>`;

        try {
            const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/mailReceive.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    subject: 'MORP Home Page Feedback',
                    body: body,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
      <main className='contact'>
        <HelmetProvider>
          <Helmet>
            <title>Contact</title>
          </Helmet>
        </HelmetProvider>
        
        <div className='socials'>
          <h2>Follow us on social media!</h2>
          <div className='icons'>
            <a href='https://x.com/TeamMORP' target='_blank'><FontAwesomeIcon icon={faSquareXTwitter}/></a> 
            <a href='https://instagram.com/TeamMORP' target='_blank'><FontAwesomeIcon icon={faSquareInstagram}/></a>
          </div>
        </div>
        <div className='content'>
          <div className='email'>
            <h2>Or send us an email!</h2>
            <h2>Have any questions or have any feedback?</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-row'>
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  required 
                  placeholder='Your name' 
                  value={formData.name} 
                  onChange={handleChange} 
                />
                <input 
                  type='email' 
                  id='email' 
                  name='email' 
                  required 
                  placeholder='Your Email' 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <textarea 
                id='message' 
                name='message' 
                required 
                placeholder='Your Message' 
                value={formData.message} 
                onChange={handleChange} 
              />
              <button type='submit'>Send</button>
            </form>
            {status && <p className='status'>{status}</p>}
          </div>
          <div className='morp-like'>
            <img src={morpLike} alt='MORP Like' />
          </div>
        </div>
      </main>
    );
};

export default Contact;