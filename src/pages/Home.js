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


            <section className="about-us">
            <div className="about-us-left">
              <h1>About Us</h1>
            </div>
            <div className="about-us-right">
              <p>We are a team of passionate developers dedicated to creating innovative and user-friendly applications. Our goal is to provide high-quality software solutions that meet the needs of our users.</p>
            </div>
          </section>

          <section className="section-one">
            <div className="section-one-left">
              <p>Our mission is to empower individuals and organizations through technology. We strive to create software that is not only functional but also intuitive and enjoyable to use.</p>
            </div>
            <div className="section-one-right">
              <h1>Our Mission</h1>
            </div>
          </section>

          <section className="section-two">
            <div className="section-two-left">
              <h1>Our Vision</h1>
            </div>
            <div className="section-two-right">
              <p>We envision a world where technology seamlessly integrates into everyday life, enhancing productivity and creativity. Our vision is to be at the forefront of this technological revolution.</p>
            </div>
          </section>

          <section className="section-three">
            <div className="section-three-left">
              <p>If you have any questions or would like to learn more about our products and services, please don't hesitate to contact us. We are here to help you achieve your goals.</p>
            </div>
            <div className="section-three-right">
              <h1>Contact Us</h1>
            </div>
          </section>
        </div>
      </>
    );
  };

export default Home;