import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/morp_light_horizontal.png';

const Navbar = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [morpmtlverseOpen, setmorpmltverseOpen] = useState(false);
  const [playerSrchOpen, setplayerSrchOpen] = useState(false);
  const [RulesOpen, setRulesOpen] = useState(false);

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <button onClick={() => toggleDropdown(setExploreOpen)}>
            Explore
          </button>
          {exploreOpen && (
            <ul className="dropdown">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                  Home
                </NavLink>
              </li>
              <li>Trending</li>
              <li>Top Characters</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleDropdown(setmorpmltverseOpen)}>
            MORP Multiverse
          </button>
          {morpmtlverseOpen && (
            <ul className="dropdown">
              <li>Worlds</li>
              <li>Character tiers</li>
              <li>Multiverse</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleDropdown(setplayerSrchOpen)}>
            Player Search
          </button>
          {playerSrchOpen && (
            <ul className="dropdown">
              <li>
                <NavLink to="/player-search" className={({ isActive }) => (isActive ? "active" : "")}>
                  Search by name
                </NavLink>
              </li>
              <li>Search by ID</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleDropdown(setRulesOpen)}>
            Rules
          </button>
          {RulesOpen && (
            <ul className="dropdown">
              <li>
                <NavLink to="/rules" className={({ isActive }) => (isActive ? "active" : "")}>
                  Game Rules
                </NavLink>
              </li>
              <li>
                <NavLink to="/combat-rules" className={({ isActive }) => (isActive ? "active" : "")}>
                  Combat Rules
                </NavLink>
              </li>
              <li>
                <NavLink to="/character-rules" className={({ isActive }) => (isActive ? "active" : "")}>
                  Character Rules
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="login-button">
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
          <button>Login</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
