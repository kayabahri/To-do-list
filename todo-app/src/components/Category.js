import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, updateTask, updateCategory, setTaskDates, moveTask } from '../redux/categorySlice';
import TaskOptions from './TaskOptions';
import '../styles/Category.css';

const Category = ({ category, onRemove }) => {
  const [task, setTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const dispatch = useDispatch();
  const iconRef = useRef(null);

  const lists = useSelector((state) => state.categories);

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

  const handleOptionSelect = (option, data) => {
    switch (option) {
      case 'edit':
        setEditingTaskId(selectedTaskId);
        setEditingTaskText(category.tasks.find(task => task.id === selectedTaskId).text);
        setShowOptions(false);
        break;
      case 'move':
        dispatch(moveTask({ fromCategoryId: category.id, taskId: selectedTaskId, toCategoryId: data.listId, position: data.position }));
        setShowOptions(false);
        break;
      case 'delete':
        handleRemoveTask(selectedTaskId);
        setShowOptions(false);
        break;
      case 'archive':
        // Archive task logic here
        break;
      case 'setDate':
        const { start, end } = data;
        dispatch(setTaskDates({ categoryId: category.id, taskId: selectedTaskId, startDate: start, endDate: end }));
        setShowOptions(false);
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

  const handleEditCategory = () => {
    setEditingCategory(true);
  };

  const handleCategoryBlur = () => {
    if (categoryName.trim() && categoryName !== category.name) {
      dispatch(updateCategory({ categoryId: category.id, newName: categoryName }));
    }
    setEditingCategory(false);
  };

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCategoryBlur();
    }
  };

  return (
    <div className="category-card">
      <div className="category-header">
        {editingCategory ? (
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onBlur={handleCategoryBlur}
            onKeyPress={handleCategoryKeyPress}
            autoFocus
            className="category-title-input"
          />
        ) : (
          <h2 className="category-title" onClick={handleEditCategory}>{category.name}</h2>
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
            <div className="task-text-wrapper">
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                  onBlur={handleTaskEditBlur}
                  onKeyPress={handleTaskEditKeyPress}
                  autoFocus
                  className="task-input-field"
                />
              ) : (
                <>
                  <span className="task-text">{task.text}</span>
                  <span
                    className="edit-task-icon"
                    onClick={() => handleIconClick(task.id)}
                    ref={iconRef}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                </>
              )}
            </div>
            <span className="task-dates">
              {task.startDate && task.endDate && (
                <>
                  <i className="fas fa-clock"></i> {new Date(task.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })} - {new Date(task.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}
                </>
              )}
            </span>
            {showOptions && selectedTaskId === task.id && (
              <TaskOptions
                onSelectOption={handleOptionSelect}
                onClose={handleCloseOptions}
                position={optionsPosition}
                lists={lists}
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
            className="task-input-field"
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
