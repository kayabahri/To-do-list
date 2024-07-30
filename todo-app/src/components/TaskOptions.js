import React, { useEffect } from 'react';
import '../styles/TaskOptions.css';

const TaskOptions = ({ onSelectOption, onClose, position }) => {
  useEffect(() => {
    document.body.classList.add('overlay-open');
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, []);

  const style = {
    top: `${position.top}px`,
    left: `${position.left}px`
  };

  return (
    <div className="task-options-overlay" onClick={onClose}>
      <div className="task-options" style={style} onClick={(e) => e.stopPropagation()}>
        <div className="task-option" onClick={() => onSelectOption('open')}>
          <i className="fas fa-external-link-alt"></i> Kartı Aç
        </div>
        <div className="task-option" onClick={() => onSelectOption('edit')}>
          <i className="fas fa-edit"></i> Düzenle
        </div>
        <div className="task-option" onClick={() => onSelectOption('dates')}>
          <i className="fas fa-calendar-alt"></i> Tarihleri düzenle
        </div>
        <div className="task-option" onClick={() => onSelectOption('move')}>
          <i className="fas fa-arrows-alt"></i> Taşı
        </div>
        <div className="task-option" onClick={() => onSelectOption('delete')}>
          <i className="fas fa-trash-alt"></i> Sil
        </div>
        <div className="task-option" onClick={() => onSelectOption('archive')}>
          <i className="fas fa-archive"></i> Arşiv
        </div>
      </div>
    </div>
  );
};

export default TaskOptions;
