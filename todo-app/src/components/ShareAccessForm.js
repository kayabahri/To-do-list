import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShareAccessForm = () => {
  const { t } = useTranslation();
  const [sharedKey, setSharedKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shared/${sharedKey}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sharedKey">{t('Enter the list title...')}</label>
      <input
        type="text"
        id="sharedKey"
        value={sharedKey}
        onChange={(e) => setSharedKey(e.target.value)}
        required
      />
      <button type="submit">{t('Go To Your Dashboard')}</button>
    </form>
  );
};

export default ShareAccessForm;
