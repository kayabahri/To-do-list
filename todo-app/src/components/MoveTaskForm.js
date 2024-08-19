import React, { useState, useEffect } from 'react';
import '../styles/MoveTaskForm.css';
import { useTranslation } from 'react-i18next';

const MoveTaskForm = ({ lists, onMove, onCancel, position }) => {
  const [selectedList, setSelectedList] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const formElement = document.querySelector('.move-task-form-container');
    if (formElement && position) {
      const rect = formElement.getBoundingClientRect();

      const adjustedTop = position.top - rect.height / 2;
      const adjustedLeft = position.left + 10;

      formElement.style.top = `${adjustedTop}px`;
      formElement.style.left = `${adjustedLeft}px`;
    }
  }, [position]);

  const handleMove = () => {
    if (selectedList) {
      onMove({ listId: selectedList, position: selectedPosition });
    } else {
      console.error('No list selected for moving the task.');
    }
  };

  return (
    <div className="move-task-form-overlay">
      <div className="move-task-form-container" style={{ position: 'absolute' }}>
        <div className="move-task-form-header">
          <h2>{t("Move Card")}</h2>
          <button onClick={onCancel} className="close-button">×</button>
        </div>
        <div className="move-task-form-body">
          <label>
            {t("List")}
            <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
              <option value="" disabled>{t("Please select a list")}</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
          </label>
          <label>
            {t("Location")}
            <input
              type="number"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(Number(e.target.value))}
              min="1"
              max={lists.find(list => list.id === selectedList)?.tasks.length + 1 || 1}
            />
          </label>
        </div>
        <div className="move-task-form-footer">
          <button onClick={handleMove} className="move-button">{t("Move")}</button>
        </div>
      </div>
    </div>
  );
};

export default MoveTaskForm;
