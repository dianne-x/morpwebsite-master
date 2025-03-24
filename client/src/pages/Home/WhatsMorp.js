import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../../style/Home/WhatsMorp.scss';

const WhatsMorp = () => {
    
  
    return (
      <main className="whats-morp-container">
        <HelmetProvider>
          <Helmet>
            <title>What's MORP?</title>
          </Helmet>
        </HelmetProvider>
        
        <div className="whats-morp"> 
        <h1>What's MORP?</h1>
        </div>
        <div className="morp-text"> 
        <h2>
          <span data-expand="ultiverse">M</span>
          <span data-expand="f">O</span>
          <span data-expand="ole">R</span>
          <span data-expand="lay">P</span>
        </h2>
        <p>A chat application tailored for roleplaying communities, combining the functionality of servers and direct messages, with features specialized for immersive roleplay. MORP allows users to create and manage custom character profiles.</p>
        </div>
      </main>
    );
  };

export default WhatsMorp;