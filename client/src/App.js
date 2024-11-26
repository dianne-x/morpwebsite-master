import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/Home/Layout.js';
import Home from './pages/Home/Home.js';
import Contact from './pages/Home/Contact.js';
import WhatsMorp from './pages/Home/WhatsMorp.js';
import About from './pages/Home/About.js';

import Login from './pages/Login';

import AppLayout from './pages/App/AppLayout.js';


function App() {
  
  return (
    <Router>
        <Routes>

          <Route path="/" element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path="/morp" element={<WhatsMorp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
          
          <Route path="/login" element={<Login />} />

          <Route path="/app" element={<AppLayout />}>
    
          </Route>

        </Routes>
    </Router>
  );
}

export default App;