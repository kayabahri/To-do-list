// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';
import { Menu, MenuItem, Button } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import '../styles/LanguageSelector.css';

const languages = {
  en: { nativeName: 'English', countryCode: 'GB' },
  tr: { nativeName: 'Türkçe', countryCode: 'TR' },
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div className="language-selector">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <FaGlobe />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(languages).map((lng) => (
          <MenuItem key={lng} onClick={() => handleLanguageChange(lng)}>
            <ReactCountryFlag 
              countryCode={languages[lng].countryCode} 
              svg 
              style={{ marginRight: 8, width: 20, height: 15 }} 
            />
            {languages[lng].nativeName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
