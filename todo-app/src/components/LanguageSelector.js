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
    console.log('Dil seçici açıldı');
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log('Dil seçici kapandı');
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      localStorage.setItem('skipInfoPage', 'true'); // InfoPage'i atla bayrağını ayarla
      localStorage.setItem('lang', lng); // InfoPage'i atla bayrağını ayarla

      setAnchorEl(null);

      //window.location.reload(); // Sayfayı yeniden yükle
    });
    console.log(`Dil değiştiriliyor: ${lng}`);
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
