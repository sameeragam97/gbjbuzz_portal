import React from "react";

const TodoItem = ({ todo, completed, handleCheckboxChange }) => {
  return (
    <li className="flex items-center mb-2 text-sm">
      <input
        type="checkbox"
        checked={completed.includes(todo)}
        onChange={() => handleCheckboxChange(todo)}
        className="mr-2"
      />
      <span style={{ textDecoration: completed.includes(todo) ? 'line-through' : 'none' }}>
        {todo}
      </span>
    </li>
  );
};

export default TodoItem;
    