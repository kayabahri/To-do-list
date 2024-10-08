import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Settings.css';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="settings-page">
      <h1>{t('Settings')}</h1>
      <p>{t('Construction is on going...')}</p>
    </div>
  );
};

export default Settings;
