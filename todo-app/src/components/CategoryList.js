import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeCategory, removeTask } from '../redux/categorySlice';
import '../styles/CategoryList.css';
import { useTranslation } from 'react-i18next';

const CategoryList = () => {
  const { t } = useTranslation();
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState({});
  
  const handleTaskChange = (categoryId, text) => {
    setTaskText((prev) => ({
      ...prev,
      [categoryId]: text,
    }));
  };

  const handleAddTask = (categoryId) => {
    if (taskText[categoryId]?.trim()) {
      dispatch(addTask({ categoryId, task: taskText[categoryId] }));
      setTaskText((prev) => ({
        ...prev,
        [categoryId]: '',
      }));
    }
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategory(categoryId));
  };

  const handleRemoveTask = (categoryId, taskId) => {
    dispatch(removeTask({ categoryId, taskId }));
  };

  return (
    <div className="category-wrapper">
      {categories.map((category) => (
        <div className="category-item" key={category.id}>
          <h3>{category.name}</h3>
          <button className="remove-category" onClick={() => handleRemoveCategory(category.id)}>{t('Kaldır')}</button>
          <div className="task-input">
            <input
              type="text"
              value={taskText[category.id] || ''}
              onChange={(e) => handleTaskChange(category.id, e.target.value)}
              placeholder={t('Yeni bir görev ekle')}
            />
            <button onClick={() => handleAddTask(category.id)}>{t('Görev Ekle')}</button>
          </div>
          <ul className="task-list">
            {category.tasks.map((task) => (
              <li key={task.id}>
                {task.text}
                <button className="remove-task" onClick={() => handleRemoveTask(category.id, task.id)}>{t('Remove')}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
