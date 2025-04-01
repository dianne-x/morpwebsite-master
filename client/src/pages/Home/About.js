import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../../style/Home/About.scss';
import MORP_US_Laci from '../../img/MORP_US_Laci.webp';
import MORP_US_Kornel from '../../img/MORP_US_Kornél.webp';
import MORP_US_Erik from '../../img/MORP_US_Erik.webp';
import MORP_US_Floor from '../../img/MORP_US_Floor.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub} from '@fortawesome/free-brands-svg-icons';

const About = () => {
  
  const members = [
    { name: 'BevizLaszlo', image: MORP_US_Laci },
    { name: 'dianne-x', image: MORP_US_Kornel },
    { name: 'RevaiErik', image: MORP_US_Erik }
  ]

  const memberComponent = members.map((member, index) => (
      <div key={index} className="member">
        <div className='img-wrapper'>
          <img src={member.image} alt={member.name} />
          <img className='floor' src={MORP_US_Floor} alt='MORP logo' />
        </div>
        <h3>{member.name}</h3>
        <button onClick={() => window.open(`https://github.com/${member.name}`, '_blank')}>
          <span><FontAwesomeIcon icon={faGithub} /> Open Github profile</span>
        </button>
      </div>
    )
  );
  
    return (
      <main className='home-about'>
        <HelmetProvider>
          <Helmet>
            <title>About</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>About Us</h1>


        <div className='members-container'>
          {memberComponent}
        </div>
      </main>
    );
  };

export default About;