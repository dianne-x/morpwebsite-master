import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Rules from './pages/Rules';
import CombatRules from './pages/COmbatRules.js';
import CharacterRules from './pages/CharRules';
import Login from './pages/Login';
import TextEditor from './TextEditor';
import SearchByName from './pages/Searchbyname';


function App() {
  return (
    <Router>
        <Routes>

          <Route path="/" element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/combat-rules" element={<CombatRules />} />
            <Route path="/character-rules" element={<CharacterRules />} />
            <Route path="/text-editor" element={<TextEditor />} />
            <Route path="/player-search" element={<SearchByName />} />

          </Route>
          
          <Route path="/login" element={<Login />} />

        </Routes>
    </Router>
  );
}

export default App;