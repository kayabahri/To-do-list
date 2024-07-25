import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../redux/todoSlice';
import '../styles/TodoItem.css';

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTodo(task.id));
  };

  return (
    <li className="todo-item">
      {task.text}
      <button onClick={handleRemove}>X</button>
    </li>
  );
};

export default TodoItem;
