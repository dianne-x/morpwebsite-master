import React, { useState } from 'react';
import logo from '../../img/morp_dark_plain.png'
import { NavLink } from 'react-router-dom';
import '../../style/Home/Navbar.scss';

const Navbar = () => {
  

  return (
    <header>
      <img src={logo} />

      <ul>
        <li>
          <NavLink to="/">
            <button>home</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/morp">
            <button>what's morp</button>
            </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <button>about</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            <button>contact</button>
          </NavLink>
        </li>
      </ul>

      <NavLink to="/login" className='login-button'>
        <button>Open App</button>
      </NavLink>
    </header>
  );
};

export default Navbar;
