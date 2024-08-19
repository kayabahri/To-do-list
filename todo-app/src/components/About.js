import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <h1>{t('About')}</h1>
      <p>{t('This application is designed to help you manage your tasks and plans.')}</p>
    </div>
  );
};

export default About;
