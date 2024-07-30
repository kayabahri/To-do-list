import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, removeTask, updateTask } from '../redux/categorySlice';
import TaskOptions from './TaskOptions';
import '../styles/Category.css';

const Category = ({ category, onRemove, onEdit, editing, onCategoryBlur, onCategoryKeyPress, onChange, editingCategoryName }) => {
  const [task, setTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const dispatch = useDispatch();
  const iconRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ categoryId: category.id, taskText: task }));
      setTask('');
      setShowInput(false);
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask({ categoryId: category.id, taskId }));
  };

  const handleTaskBlur = () => {
    handleAddTask();
  };

  const handleTaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleIconClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowOptions(true);
    const iconRect = iconRef.current.getBoundingClientRect();
    setOptionsPosition({
      top: iconRect.top,
      left: iconRect.right
    });
  };

  const handleOptionSelect = (option) => {
    switch (option) {
      case 'edit':
        setEditingTaskId(selectedTaskId);
        setEditingTaskText(category.tasks.find(task => task.id === selectedTaskId).text);
        setShowOptions(false);
        break;
      case 'move':
        // Move task logic here
        break;
      case 'delete':
        handleRemoveTask(selectedTaskId);
        setShowOptions(false);
        break;
      case 'archive':
        // Archive task logic here
        break;
      default:
        break;
    }
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
  };

  const handleUpdateTask = () => {
    if (editingTaskText.trim()) {
      dispatch(updateTask({ categoryId: category.id, taskId: editingTaskId, updatedText: editingTaskText }));
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };

  const handleTaskEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdateTask();
    }
  };

  const handleTaskEditBlur = () => {
    handleUpdateTask();
  };

  return (
    <div className="category-card">
      <div className="category-header">
        {editing ? (
          <input
            type="text"
            value={editingCategoryName}
            onChange={onChange}
            onBlur={onCategoryBlur}
            onKeyPress={onCategoryKeyPress}
            autoFocus
          />
        ) : (
          <h2 className="category-title" onClick={onEdit}>{category.name}</h2>
        )}
        {onRemove && (
          <button className="remove-category" onClick={onRemove}>
            Kaldır
          </button>
        )}
      </div>
      <ul className="task-list">
        {category.tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
                onBlur={handleTaskEditBlur}
                onKeyPress={handleTaskEditKeyPress}
                autoFocus
              />
            ) : (
              <>
                {task.text}
                <span
                  className="edit-task-icon"
                  onClick={() => handleIconClick(task.id)}
                  ref={iconRef}
                >
                  <i className="fas fa-pencil-alt"></i>
                </span>
              </>
            )}
            {showOptions && selectedTaskId === task.id && (
              <TaskOptions
                onSelectOption={handleOptionSelect}
                onClose={handleCloseOptions}
                position={optionsPosition}
              />
            )}
          </li>
        ))}
      </ul>
      {showInput ? (
        <div className="task-input">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onBlur={handleTaskBlur}
            onKeyPress={handleTaskKeyPress}
            placeholder="Yeni bir görev ekle"
          />
        </div>
      ) : (
        <div className="add-task-link" onClick={() => setShowInput(true)}>
          + Kart ekle
        </div>
      )}
    </div>
  );
};

export default Category;
