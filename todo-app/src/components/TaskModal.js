import React from 'react';
import '../styles/TaskModal.css';

const TaskModal = ({ show, onClose, task }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Task Details</h2>
        <p>{task}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
