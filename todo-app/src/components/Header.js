import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Header.css';

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false); // Dropdown state
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleToggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleMouseLeave = (event) => {
    const node = event.relatedTarget;
    if (sidebarRef.current && node instanceof Node && !sidebarRef.current.contains(node)) {
      setShowSideBar(false);
    }
  };

  const handleThemeClick = () => {
    setShowThemeDropdown(!showThemeDropdown);
  };

  return (
    <>
      <div className={`header ${theme}`}>
        <div className={`left-icon ${showSideBar ? 'sidebar-open' : ''}`} onClick={handleToggleSideBar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <h1 className="title" onClick={handleNavigateHome}>To-Do App</h1>
        <div className={`right-icon ${showSideBar ? 'sidebar-open' : ''}`}>
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </div>
      <SideBar show={showSideBar} onMouseLeave={handleMouseLeave} ref={sidebarRef}>
        <ul>
          <li className="menu-item">Anasayfa</li>
          <li className="menu-item theme" onClick={handleThemeClick}>
            Tema
            {showThemeDropdown && (
              <div className="dropdown">
                <div>Dark Mode</div>
                <div>Light Mode</div>
              </div>
            )}
          </li>
          <li className="menu-item">Hakkında</li>
          <li className="menu-item">Ayarlar</li>
        </ul>
      </SideBar>
    </>
  );
};

export default Header;
