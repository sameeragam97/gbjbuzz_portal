import React from "react";

const TaskItem = ({ color, label, description }) => {
  // Define dynamic class for the span
  const colorClass = color ? color : 'bg-gray-500'; // Default to gray if no color is provided

  return (
    <li
      className="bg-white mb-4 rounded-full shadow-md p-1 flex items-center hover:bg-slate-100 transition duration-300 ease-in-out"
      style={{ fontFamily: "Roboto, sans-serif" }} // Apply Roboto font to entire li
    >
      <div className="relative">
        <span
          className={`${colorClass} inline-flex text-black text-xs rounded-full py-2 justify-center w-28 m-0 mr-2 hover:bg-slate-300 transition duration-300 ease-in-out`} // Use colorClass dynamically
        >
          {label}
        </span>
      </div>
      <span className="m-1">
        {description}
      </span>
    </li>
  );
};

export default TaskItem;
