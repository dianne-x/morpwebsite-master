import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../../style/Home/About.scss';
import MORP_US_Laci from '../../img/MORP_US_Laci.webp';
import MORP_US_Kornel from '../../img/MORP_US_Kornél.webp';
import MORP_US_Erik from '../../img/MORP_US_Erik.webp';
import MORP_US_Floor from '../../img/MORP_US_Floor.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub} from '@fortawesome/free-brands-svg-icons';

const About = () => {
    
  
    return (
      <main>
        <HelmetProvider>
          <Helmet>
            <title>About</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>About</h1>
        <div className="image-container">
          <img className="image" src={MORP_US_Laci} alt="MORP US Laci" />
          <img className="image" src={MORP_US_Kornel} alt="MORP US Kornél" />
          <img className="image" src={MORP_US_Erik} alt="MORP US Erik" />
          <img className="image_floor" src={MORP_US_Floor} alt="MORP US Floor" />
        </div>
        <div className='github_accs'>
           <a href='https://github.com/BevizLaszlo' target='_blank'><FontAwesomeIcon icon={faSquareGithub}/></a>
           <a href='https://github.com/dianne-x' target='_blank'><FontAwesomeIcon icon={faSquareGithub}/></a>
           <a href='https://github.com/RevaiErik' target='_blank'><FontAwesomeIcon icon={faSquareGithub}/></a>
        </div>
      </main>
    );
  };

export default About;