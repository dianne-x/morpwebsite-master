import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Rules from './pages/Rules';
import TextEditor from './TextEditor';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
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
    </div>
  );
};

export default App;