import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, listName, onClose }) => {
  if (!task) {
    return null; // task undefined ise hiçbir şey render etme
  }

  return (
    <div className="task-card-overlay" onClick={onClose}>
      <div className="task-card" onClick={(e) => e.stopPropagation()}>
        <div className="task-card-header">
          <h2>{task.title}</h2>
          <button onClick={onClose} className="task-card-close">&times;</button>
        </div>
        <div className="task-card-body">
          <p className="task-card-list-name">Bulunduğu Liste: {listName}</p>
          <p>{task.description}</p>
          {/* Diğer kart içeriklerini burada gösterebilirsiniz */}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;