import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    
  
    return (
      <main>
        <HelmetProvider>
          <Helmet>
            <title>Contact</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>Contact</h1>
      </main>
    );
  };

export default Contact;