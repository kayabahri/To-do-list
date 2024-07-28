// src/components/Header.js
import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import { ThemeContext } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector'; // LanguageSelector bileşenini import edin
import '../styles/Header.css';

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
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

  return (
    <>
      <div className={`header ${theme}`}>
        <div className={`left-icon ${showSideBar ? 'sidebar-open' : ''}`} onClick={handleToggleSideBar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <h1 className="title roboto-bold" onClick={handleNavigateHome}>ToDo</h1>
        <div className="right-icon">
          <LanguageSelector />
        </div>
      </div>
      <SideBar show={showSideBar} onMouseLeave={handleMouseLeave} ref={sidebarRef} />
    </>
  );
};

export default Header;
