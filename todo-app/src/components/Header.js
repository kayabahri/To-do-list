import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import { ThemeContext } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import '../styles/Header.css';

const Header = ({ hideBars, onLanguageChange }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const { t } = useTranslation();

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
        <h1 className="title roboto-bold" onClick={handleNavigateHome}>{t('ToDo')}</h1>
        <div className="right-icon">
          <LanguageSelector onLanguageChange={onLanguageChange} />
        </div>
      </div>
      {!hideBars && <SideBar show={showSideBar} onMouseLeave={handleMouseLeave} ref={sidebarRef} />}
    </>
  );
};

export default Header;
