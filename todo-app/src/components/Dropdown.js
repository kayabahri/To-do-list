import React, { useState } from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({ title, options, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelectOption = (value) => {
    onSelect(value);
    setShowOptions(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-title" onClick={handleToggleOptions}>
        {title}
      </div>
      {showOptions && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
