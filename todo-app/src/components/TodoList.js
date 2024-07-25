import React from 'react';
import '../styles/TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({ tasks }) => {
  return (
    <div className="todo-list">
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
