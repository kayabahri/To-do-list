import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Datepicker from './Datepicker';
import MoveTaskForm from './MoveTaskForm';
import { archiveTask } from '../redux/thunks/archiveThunks';
import '../styles/TaskOptions.css';

const TaskOptions = ({ onSelectOption, onClose, lists, task, listName, position }) => {
  const { t } = useTranslation();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMoveForm, setShowMoveForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const optionsRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (optionsRef?.current && position) {
      const optionsElement = optionsRef.current;
      optionsElement.style.top = `${position.top}px`;
      optionsElement.style.left = `${position.left}px`;
    }
  }, [position]);

  useEffect(() => {
    document.body.classList.add('overlay-open');
    return () => {
      document.body.classList.remove('overlay-open');
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    onSelectOption('setDate', selectedDate);
    setShowDatepicker(false);
  };

  const handleMove = ({ listId, position }) => {
    if (!listId || typeof position !== 'number') {
      console.error('Invalid listId or position', { listId, position });
      return;
    }
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

  const openMoveForm = () => {
    setShowMoveForm(true);
  };

  const handleArchive = () => {
    if (!task.categoryId || !task.id) {
      console.error('Task data is incomplete:', task);
      return;
    }

    dispatch(archiveTask({ categoryId: task.categoryId, taskId: task.id }))
      .then(() => {
        onSelectOption('archive', { categoryId: task.categoryId, taskId: task.id });
      })
      .catch((error) => {
        console.error('Error during archive process:', error);
      });
  };

  return (
    <div className="task-options-overlay" onClick={onClose}>
      <div className="task-options" ref={optionsRef} onClick={(e) => e.stopPropagation()}>
        {showDatepicker ? (
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
          />
        ) : (
          <>
            <div className="task-option" onClick={() => onSelectOption('edit')}>
              <i className="fas fa-edit"></i> {t('Edit')}
            </div>
            <div className="task-option" onClick={openDatePicker}>
              <i className="fas fa-calendar-alt"></i> {t('Edit Date')}
            </div>
            <div className="task-option" onClick={openMoveForm}>
              <i className="fas fa-arrows-alt"></i> {t('Move')}
            </div>
            <div className="task-option" onClick={() => onSelectOption('delete')}>
              <i className="fas fa-trash-alt"></i> {t('Delete')}
            </div>
            <div className="task-option" onClick={handleArchive}>
              <i className="fas fa-archive"></i> {t('Archive')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskOptions;
