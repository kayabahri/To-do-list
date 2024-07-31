import React, { useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import '../styles/SideBar.css';
import logo from '../assets/pngwing.com.png';
import Dropdown from './Dropdown';
import { ThemeContext } from '../contexts/ThemeContext';
import { auth } from '../firebaseConfig';

const SideBar = forwardRef(({ show, onMouseLeave }, ref) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const themeOptions = [
    { label: 'Gündüz Modu', value: 'light' },
    { label: 'Gece Modu', value: 'dark' }
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
        <li onClick={handleNavigateHome}>Anasayfa</li>
        <li>
          <Dropdown title="Tema" options={themeOptions} onSelect={toggleTheme} />
        </li>
        <li onClick={handleAboutClick}>Hakkında</li>
        <li onClick={handleSettingsClick}>Ayarlar</li>
        <li onClick={handleLogout} className="logout-button">Çıkış Yap</li>
      </ul>
    </div>
  );
});

export default SideBar;
