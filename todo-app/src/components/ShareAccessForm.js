import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareAccessForm = () => {
  const [sharedKey, setSharedKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shared/${sharedKey}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sharedKey">Paylaşım Anahtarı:</label>
      <input
        type="text"
        id="sharedKey"
        value={sharedKey}
        onChange={(e) => setSharedKey(e.target.value)}
        required
      />
      <button type="submit">Görüntüle</button>
    </form>
  );
};

export default ShareAccessForm;
