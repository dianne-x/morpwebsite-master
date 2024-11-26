import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Home/Navbar';
import '../../style/Home/Home.scss';
import { useLocation, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const paths = ['/', '/morp', '/about', '/contact'];

  const handleNavigation = (direction) => {
    const currentIndex = paths.indexOf(location.pathname);
    if (direction === 'up' && currentIndex > 0) {
      navigate(paths[currentIndex - 1]);
    } else if (direction === 'down' && currentIndex < paths.length - 1) {
      navigate(paths[currentIndex + 1]);
    }
  };

  const isNavigationPossible = (direction) => {
    const currentIndex = paths.indexOf(location.pathname);
    if (direction === 'up') {
      return currentIndex > 0;
    } else if (direction === 'down') {
      return currentIndex < paths.length - 1;
    }
    return false;
  };

  return (
    <div className='home-container'>
      <Navbar />
      <Outlet />
      <div className='navigate-buttons'>
        <button
          className='up'
          onClick={() => handleNavigation('up')}
          style={{ visibility: isNavigationPossible('up') ? 'visible' : 'hidden' }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className='down'
          onClick={() => handleNavigation('down')}
          style={{ visibility: isNavigationPossible('down') ? 'visible' : 'hidden' }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
}

export default Layout;