import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Home/Layout.js';
import Home from './pages/Home/Home.js';
import Contact from './pages/Home/Contact.js';
import WhatsMorp from './pages/Home/WhatsMorp.js';
import About from './pages/Home/About.js';

import Login from './pages/Login';
import AppLayout from './pages/App/AppLayout.js';
import { connectWebSocket } from './utils/websocket'; // Import WebSocket utility

function App() {
  useEffect(() => {
    // Check for userId in localStorage
    const userId = JSON.parse(localStorage.getItem('morp-login-user'));
    if (userId) {
      //console.log('User is logged in, connecting to WebSocket...');
      connectWebSocket(userId); // Establish WebSocket connection
    }
  }, []); // Run once when the app loads

  const ProtectedRoute = ({ children }) => {
    const userId = JSON.parse(localStorage.getItem('morp-login-user'));
    if (!userId) {
      //console.log('No userId found, redirecting to login...');
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/morp" element={<WhatsMorp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;