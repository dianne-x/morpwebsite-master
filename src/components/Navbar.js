import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/morp_light_horizontal.png'

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
      <div class="logo-container">
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
                <NavLink to="/" exact activeClassName="active">
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
                <NavLink to="/player-search" activeClassName="active">Search by name</NavLink>
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
                    <NavLink to="/rules" activeClassName="active">Game Rules</NavLink>
                </li>
              <li>
                <NavLink to="/combat-rules" activeClassName="active">
                  Combat Rules
                </NavLink>
                </li>
              <li>
                <NavLink to="/character-rules" activeClassName="active">
                  Character Rules
                </NavLink>
              </li>
            </ul>
            )}
        </li>
      </ul>
      <div className="login-button">
        <NavLink to="/login" activeClassName="active">
        <button>Login</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;