import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../redux/todoSlice';
import TaskModal from './TaskModal';
import '../styles/TodoList.css';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleTaskClick(todo.text)}>
            <span className="task-text">{todo.text}</span>
            <button
              className="remove-task"
              onClick={(e) => {
                e.stopPropagation(); // Bu satır, butona tıklandığında task detaylarının açılmasını engeller
                handleRemove(todo.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <TaskModal show={isModalOpen} onClose={handleCloseModal} task={selectedTask} />
    </div>
  );
};

export default TodoList;
