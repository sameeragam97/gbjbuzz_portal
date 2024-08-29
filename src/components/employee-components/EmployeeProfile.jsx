import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeProfilePage = () => {
  const navigate = useNavigate();

  // State for profile data
  const [profileData, setProfileData] = useState({
    username: 'shwetank_gopnarayan',
    role: 'Design',
    department: 'Design Department',
    email: 'shwetankgopnarayan01@gmail.com',
    dob: '2003-04-01', // Date format for the input type="date"
  });

  // State for modal visibility and file upload
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(
    localStorage.getItem('profilePic') || null
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const picURL = URL.createObjectURL(file);
      setNewProfilePic(picURL); // Create a local URL for the preview
      localStorage.setItem('profilePic', picURL); // Save the URL to localStorage
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    navigate('/home'); // Navigate to the home page after saving
  };

  // Sample options for role and department
  const roles = ['Design', 'Development', 'Marketing'];
  const departments = [
    'Design Department',
    'Development Department',
    'Marketing Department',
  ];

  // Sample task data
  const taskData = {
    pendingTasks: 5,
    completedTasks: 8,
    inProgressTasks: 3,
    totalTasks: 16, // Total tasks for percentage calculation
  };

  // Calculate percentages
  const getPercentage = (count) => {
    return ((count / taskData.totalTasks) * 100).toFixed(0) + '%';
  };

  // Determine the color for numbers based on task count
  const getNumberColorClass = (count) => {
    if (count === 5) return 'text-red-500'; // Red for 5
    if (count === 8) return 'text-green-500'; // Green for 8
    if (count === 3) return 'text-purple-500'; // Purple for 3
    return 'text-black'; // Default color
  };

  return (
    <div className="flex ml-8 mt-8 space-x-8">
      {/* Profile Section */}
      <div className="flex flex-col w-1/3"> {/* Decreased width */}
        <div>
          {/* Heading */}
          <h1 className="text-3xl font-bold mb-6">
            <span className="text-[#E1AD01]">Employee</span>{' '}
            <span className="text-black">Profile</span>
          </h1>

          {/* Profile Section */}
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg border-b-4 border-gray-300 mb-8"> {/* Added bottom margin */}
            <div className="relative mb-4">
              <img
                src={newProfilePic || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-[#F7EAB4]"
              />
              {/* Edit Button */}
              <button
                className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-1.5 mr-2 mb-2 shadow-md hover:bg-yellow-600"
                title="Edit Profile Photo"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232a2.5 2.5 0 013.536 3.536l-10.38 10.38a2.5 2.5 0 01-1.358.575l-3.855.77a.75.75 0 01-.885-.885l.77-3.855a2.5 2.5 0 01.575-1.358l10.38-10.38z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.5 6.5L17.5 4.5M14 7l3-3M12 12l-1.5 1.5"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black">Shwetank Gopnarayan</h2>
              <p className="text-gray-500 text-lg mb-4">UI/UX Designer</p>
              <hr className="border-t-2 border-gray-300 mb-4" /> {/* Line below UI/UX Designer */}
              <div className="w-full space-y-6">
                <div className="flex flex-col items-start mb-4">
                  <span className="text-gray-500 font-bold">Username</span>
                  <span className="text-black font-bold">{profileData.username}</span>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <span className="text-gray-500 font-bold">Role</span>
                  <span className="text-black font-bold">{profileData.role}</span>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <span className="text-gray-500 font-bold">Department</span>
                  <span className="text-black font-bold">{profileData.department}</span>
                </div>
                <div className="flex flex-col items-start mb-4">
                  <span className="text-gray-500 font-bold">Email</span>
                  <span className="text-black font-bold">{profileData.email}</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-gray-500 font-bold">Date of Birth</span>
                  <span className="text-black font-bold">{profileData.dob}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Section */}
      <div className="w-2/3 flex flex-col space-y-4 mt-16"> {/* Decreased width */}
        <div className="flex flex-row space-x-2"> {/* Reduced space between buttons */}
          <button className={`bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 h-32 w-[300px] flex flex-col items-center justify-center text-black`}> {/* Increased height */}
            <div className={`text-3xl font-bold mb-1 ${getNumberColorClass(taskData.pendingTasks)}`}>
              {taskData.pendingTasks}
            </div> {/* Number above the text */}
            <div className="text-sm font-bold mb-1">Pending Tasks</div>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-chart-pie mr-1" style={{ color: '#F5C300' }}></i> {/* Dark yellow pie chart icon */}
              {getPercentage(taskData.pendingTasks)}
            </div> {/* Percentage below the text */}
          </button>
          <button className={`bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 h-32 w-[300px] flex flex-col items-center justify-center text-black`}> {/* Increased height */}
            <div className={`text-3xl font-bold mb-1 ${getNumberColorClass(taskData.completedTasks)}`}>
              {taskData.completedTasks}
            </div> {/* Number above the text */}
            <div className="text-sm font-bold mb-1">Completed Tasks</div>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-chart-pie mr-1" style={{ color: '#F5C300' }}></i> {/* Dark yellow pie chart icon */}
              {getPercentage(taskData.completedTasks)}
            </div> {/* Percentage below the text */}
          </button>
          <button className={`bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 h-32 w-[300px] flex flex-col items-center justify-center text-black`}> {/* Increased height */}
            <div className={`text-3xl font-bold mb-1 ${getNumberColorClass(taskData.inProgressTasks)}`}>
              {taskData.inProgressTasks}
            </div> {/* Number above the text */}
            <div className="text-sm font-bold mb-1">In Progress Tasks</div>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-chart-pie mr-1" style={{ color: '#F5C300' }}></i> {/* Dark yellow pie chart icon */}
              {getPercentage(taskData.inProgressTasks)}
            </div> {/* Percentage below the text */}
          </button>
        </div>

        {/* Dashboard Section */}
        <div className="w-full h-[calc(100vh-15rem)] bg-white border border-gray-300 rounded-lg shadow-md mt-4 border-b-2 border-gray-300 relative"> {/* Adjusted height */}
          {/* Dashboard Heading */}
          <h2 className="text-2xl font-bold text-gray-500 absolute top-4 left-8">Dashboard</h2> {/* Added left spacing */}

          {/* Buttons Below Heading */}
          <div className="flex flex-row space-x-2 justify-start items-center mt-16 ml-8"> {/* Added left margin */}
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 w-32">Attendance</button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 w-32">Tasks</button>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 w-32">Performance</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Profile Photo</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={profileData.role}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Department</label>
                <select
                  name="department"
                  value={profileData.department}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfilePage;
