import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import morpHomepic from '../../img/Morp_Home_pic.png';
import '../../style/Home/Home.scss';

const Home = () => {
    return (
      <main className="home-container">
        <HelmetProvider>
          <Helmet>
            <title>Home</title>
          </Helmet>
        </HelmetProvider>

        <h1>Home</h1>
        
        <div className="image-container">
          <img src={morpHomepic} alt="Morp Home" />
        </div>
      </main>
    );
  };

export default Home;