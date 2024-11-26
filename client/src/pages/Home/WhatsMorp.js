import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const WhatsMorp = () => {
    
  
    return (
      <main>
        <HelmetProvider>
          <Helmet>
            <title>WhatsMorp</title>
          </Helmet>
        </HelmetProvider>
        
        <h1>WhatsMorp</h1>
      </main>
    );
  };

export default WhatsMorp;