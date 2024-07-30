import React, { useState, useEffect } from 'react';
import Datepicker from './Datepicker';
import '../styles/TaskOptions.css';

const TaskOptions = ({ onSelectOption, onClose, position, lists }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showMoveForm, setShowMoveForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ start: null, end: null });
  const [selectedList, setSelectedList] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(1);

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

  const handleMove = () => {
    onSelectOption('move', { listId: selectedList, position: selectedPosition });
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

  return (
    <div className="task-options-overlay" onClick={onClose}>
      <div className="task-options" style={style} onClick={(e) => e.stopPropagation()}>
        {showDatepicker ? (
          <Datepicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : showMoveForm ? (
          <div className="move-form">
            <label>Liste</label>
            <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
            <label>Konum</label>
            <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button onClick={handleMove}>Taşı</button>
            <button onClick={handleCancel}>İptal</button>
          </div>
        ) : (
          <>
            <div className="task-option" onClick={() => onSelectOption('open')}>
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
