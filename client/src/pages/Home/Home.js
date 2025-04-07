import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import morpHomepic from '../../img/Morp_Home_pic.png';
import morpHomeUFO from '../../img/MORP_Home_UFO.webp';
import '../../style/Home/Home.scss';

const Home = () => {
    return (
      <main className="home-container">
        <HelmetProvider>
          <Helmet>
            <title>Home</title>
          </Helmet>
        </HelmetProvider>

        <div className="ufo-container">
          <img src={morpHomeUFO} alt="Morp UFO" className="ufo" />
        </div>
        
        <div className="image-container">
          <img src={morpHomepic} alt="Morp Home" />
        </div>

        <a href='/MORPSetup.msi' download={true} className="download-link">
          <span>Download Desktop Client</span>
        </a>
      </main>
    );
  };

export default Home;