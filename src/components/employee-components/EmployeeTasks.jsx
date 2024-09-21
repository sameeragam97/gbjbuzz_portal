import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MiddleSection = () => {
  const [tasks, setTasks] = useState([
    { projectNumber: 'MD0345EF', assignedTo: 'Update Ui', status: 'Approved', dueDate: '10 Jun' },
    { projectNumber: 'MD0345EF', assignedTo: 'Update Ui', status: 'Pending', dueDate: '12 Jun' },
    { projectNumber: 'MD0456GH', assignedTo: 'Update Ui', status: 'In Progress', dueDate: '15 Jun' },
    { projectNumber: 'MD0789IJ', assignedTo: 'Update Ui', status: 'Returned', dueDate: '18 Jun' },
    { projectNumber: 'MD0123KL', assignedTo: 'Update Ui', status: 'Approved', dueDate: '22 Jun' },
  ]);

  const [tasksManagement, setTasksManagement] = useState([
    { projectNumber: 'MD0987LM', assignedTo: 'Rachel Zane', status: 'Pending', dueDate: '05 Jul' },
    { projectNumber: 'MD0654NO', assignedTo: 'Louis Litt', status: 'In Progress', dueDate: '10 Jul' },
    { projectNumber: 'MD0234PQ', assignedTo: 'Donna Paulsen', status: 'Returned', dueDate: '15 Jul' },
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    projectNumber: '',
    assassignedTo: '',
    status: 'Pending',
    dueDate: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeButton, setActiveButton] = useState('My Tasks');

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewTask({ projectNumber: '', assignedTo: '', status: 'Pending', dueDate: '' });
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
      setFilteredTasks(updatedTasks);
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
      task.assignedTo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const handleDeleteTask = (index) => {
    if (activeButton === 'My Tasks') {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
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
      setFilteredTasks(updatedTasks);
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
    const isManagement = activeButton === 'Tasks Management';
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Project Number</th>
            <th className="py-2">{isManagement ? 'Assigned To' : 'Assigned To'}</th>
            <th className="py-2">{isManagement ? 'Details' : 'Due Date'}</th>
            <th className="py-2">{isManagement ? 'Review Status' : 'Status'}</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {(isManagement ? tasksManagement : filteredTasks).map((task, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{task.projectNumber}</td>
              <td className="py-2">{task.assignedTo}</td>
              <td className="py-2">
                {isManagement ? (
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Details</button>
                ) : (
                  task.dueDate
                )}
              </td>
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
      <div>
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            <span className="text-yellow-500">Employee</span> Tasks
          </h1>
          <div className="flex space-x-4 mt-4 mb-6">
            <button
              className={`py-2 px-4 rounded-lg border-b-2 ${activeButton === 'My Tasks' ? 'border-yellow-500' : 'border-transparent'} hover:border-yellow-500 focus:outline-none`}
              onClick={() => {
                setActiveButton('My Tasks');
                setFilteredTasks(tasks);
                setSearchQuery('');
              }}
            >
              My Tasks
            </button>
            <button
              className={`py-2 px-4 rounded-lg border-b-2 ${activeButton === 'Tasks Management' ? 'border-yellow-500' : 'border-transparent'} hover:border-yellow-500 focus:outline-none`}
              onClick={() => {
                setActiveButton('Tasks Management');
                setFilteredTasks(tasksManagement);
                setSearchQuery('');
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
              <p className="text-gray-500">50.00%</p>
            </div>
            <div className="bg-white p-3 rounded shadow-lg text-center flex-1">
              <h2 className="text-xl font-bold text-green-600">3</h2>
              <p className="text-gray-600">Approved</p>
              <p className="text-gray-500">15.55%</p>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex-1 flex items-center bg-white border rounded-lg px-4 py-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="ml-2 w-full outline-none"
              />
            </div>
            {activeButton === 'Tasks Management' && (
              <button
                className="ml-4 py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={handleAddTaskClick}
              >
                Add Task+
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {renderTable()}
        </div>
      </div>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <div className="mb-4">
              <label className="block mb-2">Project Number</label>
              <input
                type="text"
                name="projectNumber"
                value={newTask.projectNumber}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={newTask.assignedTo}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Due Date</label>
              <DatePicker
                selected={newTask.dueDate ? new Date(newTask.dueDate) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="border px-4 py-2 w-full rounded-lg"
                placeholderText="Select due date"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="border px-4 py-2 w-full rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Returned">Returned</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleAddTask}>
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
