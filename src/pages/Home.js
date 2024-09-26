import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import logo from '../img/morp_light_horizontal.png';

const Home = () => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/text-editor');
    };
  
    return (
      <>
         <Helmet>
          <title>MORP - Home Page</title>
        </Helmet>

        <div className="main-content">
          <header className="header">
            <h1>Rólunk</h1>
            <p>Anything I desire can be made reality</p>
          </header>
          <button className="btn" onClick={handleButtonClick}>Text Editor</button>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
      </>
    );
  };

export default Home;