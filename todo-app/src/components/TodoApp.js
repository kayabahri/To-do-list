import React from 'react';
import Todoinput from './Todoinput';
import TodoList from './TodoList';
import '../styles/TodoApp.css';

const TodoApp = () => {
  return (
    <div className="todo-app">
      <Todoinput />
      <TodoList />
    </div>
  );
};

export default TodoApp;
