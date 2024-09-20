import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Rules from './pages/Rules';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="main-content">
          <header className="header">
            <h1>Multiverse of Role Play</h1>
            <p>Anything I desire can be made reality</p>
          </header>
  </div>
);

export default App;