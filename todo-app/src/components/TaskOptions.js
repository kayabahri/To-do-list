import React, { useState, useEffect } from 'react';
import Datepicker from './Datepicker';
import MoveTaskForm from './MoveTaskForm';
import TaskCard from './TaskCard';
import '../styles/TaskOptions.css';

const TaskOptions = ({ onSelectOption, onClose, position, lists, task, listName }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMoveForm, setShowMoveForm] = useState(false);
  const [showTaskCard, setShowTaskCard] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [moveFormPosition, setMoveFormPosition] = useState({ top: 0, left: 0 });

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    onSelectOption('setDate', selectedDate);
    setShowDatepicker(false);
  };

  const handleMove = ({ listId, position }) => {
    onSelectOption('move', { listId, position });
    setShowMoveForm(false);
  };

  const handleCancel = () => {
    setShowDatepicker(false);
    setShowMoveForm(false);
  };

  const openDatePicker = () => {
    setShowDatepicker(true);
  };

  const openMoveForm = (e) => {
    const rect = e.target.getBoundingClientRect();
    const formTop = rect.top + window.scrollY;
    const formLeft = rect.left + window.scrollX;
    setMoveFormPosition({ top: formTop, left: formLeft });
    setShowMoveForm(true);
  };

  const openTaskCard = () => {
    setShowTaskCard(true);
  };

  const closeTaskCard = () => {
    setShowTaskCard(false);
  };

  return (
    <div className="task-options-overlay" onClick={onClose}>
      <div className="task-options" style={style} onClick={(e) => e.stopPropagation()}>
        {showTaskCard ? (
          <TaskCard task={task} listName={listName} onClose={closeTaskCard} />
        ) : showDatepicker ? (
          <Datepicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : showMoveForm ? (
          <MoveTaskForm
            lists={lists}
            onMove={handleMove}
            onCancel={handleCancel}
            position={moveFormPosition}
          />
        ) : (
          <>
            <div className="task-option" onClick={openTaskCard}>
              <i className="fas fa-external-link-alt"></i> Kartı Aç
            </div>
            <div className="task-option" onClick={() => onSelectOption('edit')}>
              <i className="fas fa-edit"></i> Düzenle
            </div>
            <div className="task-option" onClick={openDatePicker}>
              <i className="fas fa-calendar-alt"></i> Tarihleri düzenle
            </div>
            <div className="task-option" onClick={openMoveForm}>
              <i className="fas fa-arrows-alt"></i> Taşı
            </div>
            <div className="task-option" onClick={() => onSelectOption('delete')}>
              <i className="fas fa-trash-alt"></i> Sil
            </div>
            <div className="task-option" onClick={() => onSelectOption('archive')}>
              <i className="fas fa-archive"></i> Arşiv
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskOptions;
