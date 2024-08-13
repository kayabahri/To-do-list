import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#about">ToDo Hakkında</a> |
          <a href="#jobs">İş İlanları</a> |
          <a href="#apps">Uygulamalar</a> |
          <a href="#contact">Bize Ulaşın</a>
        </div>
        <div className="social-icons">
          <a href="https://www.instagram.com/kayaa.bahri/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.facebook.com/?locale=tr_TR" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.linkedin.com/in/bahrikaya/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <div className="footer-bottom">
          Telif Hakkı © 2024 ToDo
        </div>
      </div>
    </footer>
  );
};

export default Footer;
