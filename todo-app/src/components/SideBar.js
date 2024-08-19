import React, { useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import '../styles/SideBar.css';
import logo from '../assets/pngwing.com.png';
import Dropdown from './Dropdown';
import { ThemeContext } from '../contexts/ThemeContext';
import { auth } from '../firebaseConfig';

const SideBar = forwardRef(({ show, onMouseLeave }, ref) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const themeOptions = [
    { label: t('Light Mode'), value: 'light' },
    { label: t('Dark Mode'), value: 'dark' }
  ];

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleArchiveClick = () => {
    navigate('/archive');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div
      className={`sidebar ${show ? 'show' : ''} ${theme}`}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      <div className="sidebar-logo">
        <img src={logo} alt="ToDo Logo" />
      </div>
      <ul>
        <li onClick={handleNavigateHome}>{t('Homepage')}</li>
        <li>
          <Dropdown title={t('Theme')} options={themeOptions} onSelect={toggleTheme} />
        </li>
        <li onClick={handleAboutClick}>{t('About')}</li>
        <li onClick={handleSettingsClick}>{t('Settings')}</li>
        <li onClick={handleArchiveClick}>{t('Archive')}</li>
        <li onClick={handleLogout} className="logout-button">{t('Log Out')}</li>
      </ul>
    </div>
  );
});

export default SideBar;
