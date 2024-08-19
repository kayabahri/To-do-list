import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/TaskModal.css';

const TaskModal = ({ show, onClose, task }) => {
  const { t } = useTranslation();

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{t('Task Details')}</h2>
        <p>{task}</p>
        <button onClick={onClose}>{t('Close')}</button>
      </div>
    </div>
  );
};

export default TaskModal;
