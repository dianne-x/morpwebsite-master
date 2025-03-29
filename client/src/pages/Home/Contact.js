import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../../style/Home/Contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import morpLike from '../../img/MORP_Like.webp';

const Contact = () => {
    return (
      <main className='contact'>
        <HelmetProvider>
          <Helmet>
            <title>Contact</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>Contact</h1>
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
            <form>
              <div className='form-row'>
                <input type='text' id='name' name='name' required placeholder='Your name'/>
                <input type='email' id='email' name='email' required placeholder='Your Email'/>
              </div>
              <textarea id='message' name='message' required placeholder='Your Message'/>
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
        <div className='morp-like'>
          <img src={morpLike} alt='MORP Like' />
        </div>
      </main>
    );
};

export default Contact;