import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const MiddleSection = () => {
  const [tasks, setTasks] = useState([
    { projectNumber: 'MD0345EF', description: 'Print table website', status: 'Approved', dueDate: '10 Jun' },
    { projectNumber: 'MD0345EF', description: 'Create a portal', status: 'Pending', dueDate: '12 Jun' },
    { projectNumber: 'MD0456GH', description: 'Design user profile', status: 'In Progress', dueDate: '15 Jun' },
    { projectNumber: 'MD0789IJ', description: 'Fix bugs in API', status: 'Returned', dueDate: '18 Jun' },
    { projectNumber: 'MD0123KL', description: 'Update database schema', status: 'Approved', dueDate: '22 Jun' },
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks); // For displaying filtered tasks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    projectNumber: '',
    description: '',
    status: 'Pending',
    dueDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask({ projectNumber: '', description: '', status: 'Pending', dueDate: '' });
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = () => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks
    handleModalClose();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = tasks.filter(task =>
      task.projectNumber.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks
  };

  const handleStatusChange = (e, index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: e.target.value } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Returned':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header Section */}
      <div className="mb-12"> {/* Increased margin-bottom */}
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-500">Employee</span> Tasks
        </h1>
        <div className="flex space-x-4 mt-8"> {/* Increased margin-top */}
          <div className="bg-white p-4 rounded shadow-lg text-center flex-1">
            <h2 className="text-2xl font-bold text-purple-600">2</h2>
            <p className="text-gray-600">Today</p>
            <p className="text-gray-500">27.77%</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg text-center flex-1">
            <h2 className="text-2xl font-bold text-red-600">5</h2>
            <p className="text-gray-600">Returned</p>
            <p className="text-gray-500">27.77%</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg text-center flex-1">
            <h2 className="text-2xl font-bold text-yellow-600">11</h2>
            <p className="text-gray-600">Pending</p>
            <p className="text-gray-500">61.11%</p>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Task List</h2> {/* Added heading */}
        <div className="flex items-center mb-4">
          <div className="relative w-full mr-4">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-8 border px-4 py-2 rounded-lg"
            />
          </div>
          <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleAddTaskClick}>
            Add new task +
          </button>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Project Number</th>
              <th className="py-2">Description</th>
              <th className="py-2">Status</th>
              <th className="py-2">Due Date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index} className="text-center">
                <td className="py-2">{task.projectNumber}</td>
                <td className="py-2">{task.description}</td>
                <td className="py-2">
                  <div className="flex items-center justify-center">
                    <span className={`status-circle ${getStatusColor(task.status)}`}></span>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(e, index)}
                      className={`border px-2 py-1 rounded-lg ${getStatusColor(task.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Returned">Returned</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                </td>
                <td className="py-2">{task.dueDate}</td>
                <td className="py-2">
                  <button className="text-red-500" onClick={() => handleDeleteTask(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Add New Task</h2>
            <input
              type="text"
              name="projectNumber"
              placeholder="Project Number"
              value={newTask.projectNumber}
              onChange={handleInputChange}
              className="w-full mb-4 border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full mb-4 border px-4 py-2 rounded-lg"
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full mb-4 border px-4 py-2 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Returned">Returned</option>
              <option value="Approved">Approved</option>
            </select>
            <input
              type="text"
              name="dueDate"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="w-full mb-4 border px-4 py-2 rounded-lg"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-600"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleSection;
