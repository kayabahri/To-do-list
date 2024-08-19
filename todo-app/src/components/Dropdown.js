import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Dropdown.css';

const Dropdown = ({ title, options, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { t } = useTranslation();

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelectOption = (value) => {
    localStorage.setItem('theme', value);
    onSelect(value);
    setShowOptions(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={handleToggleOptions}>
        {t(title)}
      </div>
      {showOptions && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option.value)}>
              {t(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
