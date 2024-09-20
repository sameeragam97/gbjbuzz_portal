import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS

const MiddleSection = () => {
  const [tasks, setTasks] = useState([
    { projectNumber: 'MD0345EF', description: 'Print table website', status: 'Approved', dueDate: '10 Jun' },
    { projectNumber: 'MD0345EF', description: 'Create a portal', status: 'Pending', dueDate: '12 Jun' },
    { projectNumber: 'MD0456GH', description: 'Design user profile', status: 'In Progress', dueDate: '15 Jun' },
    { projectNumber: 'MD0789IJ', description: 'Fix bugs in API', status: 'Returned', dueDate: '18 Jun' },
    { projectNumber: 'MD0123KL', description: 'Update database schema', status: 'Approved', dueDate: '22 Jun' },
  ]);

  const [tasksManagement, setTasksManagement] = useState([
    { projectNumber: 'MD0987LM', description: 'Update UI', status: 'Pending', dueDate: '05 Jul' },
    { projectNumber: 'MD0654NO', description: 'Integrate API', status: 'In Progress', dueDate: '10 Jul' },
    { projectNumber: 'MD0234PQ', description: 'Fix UI bugs', status: 'Returned', dueDate: '15 Jul' },
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
  const [activeButton, setActiveButton] = useState('My Tasks'); // State for active button

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
    if (activeButton === 'My Tasks') {
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filtered tasks
    } else {
      const updatedTasksManagement = [newTask, ...tasksManagement];
      setTasksManagement(updatedTasksManagement);
    }
    handleModalClose();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = (activeButton === 'My Tasks' ? tasks : tasksManagement).filter(task =>
      task.projectNumber.toLowerCase().includes(query.toLowerCase()) ||
      task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleDeleteTask = (index) => {
    if (activeButton === 'My Tasks') {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filtered tasks
    } else {
      const updatedTasksManagement = tasksManagement.filter((_, i) => i !== index);
      setTasksManagement(updatedTasksManagement);
    }
  };

  const handleStatusChange = (e, index) => {
    const updatedTasks = (activeButton === 'My Tasks' ? tasks : tasksManagement).map((task, i) =>
      i === index ? { ...task, status: e.target.value } : task
    );
    if (activeButton === 'My Tasks') {
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filtered tasks
    } else {
      setTasksManagement(updatedTasks);
    }
  };

  const handleDateChange = (date) => {
    setNewTask({ ...newTask, dueDate: date ? date.toISOString().split('T')[0] : '' });
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

  const renderTable = () => {
    return (
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
          {(activeButton === 'My Tasks' ? filteredTasks : tasksManagement).map((task, index) => (
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
    );
  };

  return (
    <div className="flex-1 mx-3 max-w-5xl mt-10">
      {/* Main Content Section */}
      <div>
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            <span className="text-yellow-500">Employee</span> Tasks
          </h1>
          {/* Section Type Buttons */}
          <div className="flex space-x-4 mt-4 mb-6">
            <button
              className={`py-2 px-4 rounded-lg border-b-2 ${activeButton === 'My Tasks' ? 'border-yellow-500' : 'border-transparent'} hover:border-yellow-500 focus:outline-none`}
              onClick={() => {
                setActiveButton('My Tasks');
                setFilteredTasks(tasks); // Reset filtered tasks to show all tasks when "My Tasks" is active
                setSearchQuery(''); // Clear search query
              }}
            >
              My Tasks
            </button>
            <button
              className={`py-2 px-4 rounded-lg border-b-2 ${activeButton === 'Tasks Management' ? 'border-yellow-500' : 'border-transparent'} hover:border-yellow-500 focus:outline-none`}
              onClick={() => {
                setActiveButton('Tasks Management');
                setFilteredTasks(tasksManagement); // Reset filtered tasks to show all tasks when "Tasks Management" is active
                setSearchQuery(''); // Clear search query
              }}
            >
              Tasks Management
            </button>
          </div>
          <div className="flex space-x-3 mt-4">
            <div className="bg-white p-3 rounded shadow-lg text-center flex-1">
              <h2 className="text-xl font-bold text-purple-600">2</h2>
              <p className="text-gray-600">Today</p>
              <p className="text-gray-500">27.77%</p>
            </div>
            <div className="bg-white p-3 rounded shadow-lg text-center flex-1">
              <h2 className="text-xl font-bold text-red-600">5</h2>
              <p className="text-gray-600">Returned</p>
              <p className="text-gray-500">27.77%</p>
            </div>
            <div className="bg-white p-3 rounded shadow-lg text-center flex-1">
              <h2 className="text-xl font-bold text-yellow-600">10</h2>
              <p className="text-gray-600">Pending</p>
              <p className="text-gray-500">27.77%</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <FaSearch className="absolute right-3 top-2 text-gray-500" />
            </div>
            {activeButton === 'Tasks Management' && (
              <button
                onClick={handleAddTaskClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Add New Task +
              </button>
            )}
          </div>
          {renderTable()}
        </div>
      </div>

      {/* Modal for Adding New Task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              name="projectNumber"
              value={newTask.projectNumber}
              onChange={handleInputChange}
              placeholder="Project Number"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Returned">Returned</option>
              <option value="Approved">Approved</option>
            </select>
            <DatePicker
              selected={newTask.dueDate ? new Date(newTask.dueDate) : null}
              onChange={handleDateChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              placeholderText="Due Date"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
