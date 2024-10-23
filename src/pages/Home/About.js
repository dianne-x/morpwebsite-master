import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const About = () => {
    
  
    return (
      <main>
        <HelmetProvider>
          <Helmet>
            <title>About</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>About</h1>
      </main>
    );
  };

export default About;