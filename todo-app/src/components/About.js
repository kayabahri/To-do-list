import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <h1>{t('Hakkında')}</h1>
      <p>{t('Bu uygulama, görevlerinizi ve planlarınızı yönetmenize yardımcı olmak için tasarlanmıştır.')}</p>
    </div>
  );
};

export default About;
