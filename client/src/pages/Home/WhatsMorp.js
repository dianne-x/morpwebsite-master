import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const WhatsMorp = () => {
    
  
    return (
      <main>
        <HelmetProvider>
          <Helmet>
            <title>What's MORP?</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>What's MORP?</h1>
        <p>MORP is an acronym that stands for Multiverse of Role Play.</p>
        <p>A chat application tailored for roleplaying communities, combining the functionality of servers and direct messages, with features specialized for immersive roleplay. MORP allows users to create and manage custom character profiles.</p>
      </main>
    );
  };

export default WhatsMorp;