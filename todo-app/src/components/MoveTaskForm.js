import React, { useState, useEffect } from 'react';
import '../styles/MoveTaskForm.css';

const MoveTaskForm = ({ lists, onMove, onCancel, position }) => {
  const [selectedList, setSelectedList] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(1);
  const [formPosition, setFormPosition] = useState({ top: position.top, left: position.left });

  useEffect(() => {
    const handleResize = () => {
      const formElement = document.querySelector('.move-task-form-container');
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        const newTop = rect.top < 0 ? 0 : rect.top + rect.height > window.innerHeight ? window.innerHeight - rect.height : rect.top;
        const newLeft = rect.left < 0 ? 0 : rect.left + rect.width > window.innerWidth ? window.innerWidth - rect.width : rect.left;
        setFormPosition({ top: newTop, left: newLeft });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);

  const handleMove = () => {
    onMove({ listId: selectedList, position: selectedPosition });
  };

  return (
    <div className="move-task-form-overlay">
      <div className="move-task-form-container" style={{ top: formPosition.top, left: formPosition.left }}>
        <div className="move-task-form-header">
          <h2>Kartı Taşı</h2>
          <button onClick={onCancel} className="close-button">×</button>
        </div>
        <div className="move-task-form-body">
          <label>
            Liste
            <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
          </label>
          <label>
            Konum
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
          <button onClick={handleMove} className="move-button">Taşı</button>
        </div>
      </div>
    </div>
  );
};

export default MoveTaskForm;
