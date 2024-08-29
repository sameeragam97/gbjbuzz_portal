import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Calendar from "react-calendar";
import "../../App.css";

const RightSidebar = () => {
  const [todos, setTodos] = useState([
    "Analyze Customer Churn Data",
    "Prepare Weekly Performance Report",
    "Optimize Machine Learning Model",
    "Collaborate with Product Team",
    "Update Data Pipelines",
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [completed, setCompleted] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleCheckboxChange = (todo) => {
    setCompleted((prevCompleted) =>
      prevCompleted.includes(todo)
        ? prevCompleted.filter((item) => item !== todo)
        : [...prevCompleted, todo]
    );
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo("");
      setShowInput(false);
    }
  };

  const handleDeleteTodo = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  return (
    <div className="w-3/12 py-3 px-6 bg-[#E1AD01]">
      <div className="p-3 rounded-lg bg-white mb-4">
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Calendar
            onChange={setDate}
            value={date}
            className="calendar-small"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg  mb-4 transition duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-5">
          <div className="font-semibold text-lg">
            <span className="text-white">To Do</span> Today
          </div>
          <button
            className="bg-black text-[#E1AD01] px-3 py-2 rounded-2xl text-xs font-bold"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? "Cancel" : "+ Add"}
          </button>
        </div>
        {showInput && (
          <div className="mb-4 flex items-center ">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full h-8 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition duration-200 ease-in-out placeholder-gray-400"
            />
            <button
              className="bg-yellow-300 px-3 py-2 rounded-2xl text-xs font-semibold ml-2"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        )}
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <TodoItem
                todo={todo}
                completed={completed}
                handleCheckboxChange={handleCheckboxChange}
              />
              <button
                className="text-red-700 text-xs font-semibold bg-red-50 hover:bg-red-100 transition duration-200 ease-in-out px-2 py-1 rounded-xl"
                onClick={() => handleDeleteTodo(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 rounded-lg shadow-xl bg-white hover:bg-slate-100 transition duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold text-lg">
            <span className="text-yellow-600">Upcoming</span> Events
          </div>
        </div>
        <ul>
          <li className="mb-2">Team Meeting - August 1, 2024</li>
          <li className="mb-2">Project Deadline - August 5, 2024</li>
          <li className="mb-2">Company Retreat - August 15, 2024</li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
