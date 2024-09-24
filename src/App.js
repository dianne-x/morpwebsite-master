import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Rules from './pages/Rules';
import CombatRules from './pages/COmbatRules.js';
import CharacterRules from './pages/CharRules';
import TextEditor from './TextEditor';
import Login from './pages/Login';
import './style/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/combat-rules" element={<CombatRules />} />
          <Route path="/character-rules" element={<CharacterRules />} />
          <Route path="/login" element={<Login />} />
          <Route path="/text-editor" element={<TextEditor />} />
        </Routes>
      </div>
    </Router>
  );
}


const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/text-editor');
  };

  return (
    <div className="main-content">
      <header className="header">
        <h1>Multiverse of Role Play</h1>
        <p>Anything I desire can be made reality</p>
      </header>
      <button className="btn" onClick={handleButtonClick}>Text Editor</button>
      <FontAwesomeIcon icon={faEnvelope} />
    </div>
  );
};

export default App;