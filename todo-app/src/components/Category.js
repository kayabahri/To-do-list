import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, removeTask } from '../redux/categorySlice';
import '../styles/Category.css';

const Category = ({ category, onRemove }) => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask({ categoryId: category.id, task }));
      setTask('');
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask({ categoryId: category.id, taskId }));
  };

  return (
    <div className="category">
      <h2>
        {category.name}
        <button className="remove-category" onClick={onRemove}>Remove Category</button>
      </h2>
      <div className="task-list">
        {category.tasks.map((task) => (
          <div key={task.id} className="task-item">
            {task.text}
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="task-input">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Category;
