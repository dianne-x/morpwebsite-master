import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../../style/Home/WhatsMorp.scss';
import morpAstronaut from '../../img/MORP_Astronaut.webp';
import morpPortal from '../../img/MORP_Portal.webp';


const WhatsMorp = () => {
    
  
    return (
      <main className="whats-morp-container">
        <HelmetProvider>
          <Helmet>
            <title>What's MORP?</title>
          </Helmet>
        </HelmetProvider>
        
        <div className="morp-content">
          <div className="morp-text"> 
            <h1>
              <span data-expand="ultiverse">M</span>
              <span data-expand="f">O</span>
              <span data-expand="ole">R</span>
              <span data-expand="lay">P</span>
            </h1>
            <p>A chat application tailored for roleplaying communities, combining the functionality of servers and direct messages, with features specialized for immersive roleplay. MORP allows users to create and manage custom character profiles.</p>
          </div>
          <div className="morp-image">
            <img src={morpPortal} alt="MORP Portal Bg" className="portal" />
            <img src={morpAstronaut} alt="MORP Astronaut" className="astronaut" />
          </div>
        </div>
      </main>
    );
  };

export default WhatsMorp;