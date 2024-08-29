import React, { useState } from "react";
import {
  FaSearch,
  FaSort,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Shwetank Gopnarayan",
      date: "2024-07-05",
      jobTitle: "Data Scientist",
      email: "shwetank@example.com",
      phone: "+1234567890",
    },
    {
      id: 2,
      name: "Sagar Tayde",
      date: "2024-07-10",
      jobTitle: "Data Scientist",
      email: "sagar@example.com",
      phone: "+1234567891",
    },
    {
      id: 3,
      name: "Sarthak Kakad",
      date: "2024-07-23",
      jobTitle: "Data Scientist",
      email: "sarthak@example.com",
      phone: "+1234567892",
    },
    {
      id: 4,
      name: "Tejas Patil",
      date: "2024-08-02",
      jobTitle: "Frontend Developer",
      email: "tejas@example.com",
      phone: "+1234567893",
    },
    {
      id: 5,
      name: "Niraj Kamble",
      date: "2024-08-05",
      jobTitle: "Data Scientist",
      email: "niraj@example.com",
      phone: "+1234567894",
    },
    {
      id: 6,
      name: "Sameer Agam",
      date: "2024-07-10",
      jobTitle: "Frontend Developer",
      email: "sameer@example.com",
      phone: "+1234567895",
    },
    {
      id: 7,
      name: "Atharva Thakre",
      date: "2024-07-23",
      jobTitle: "Java Developer",
      email: "atharva@example.com",
      phone: "+1234567896",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleReport = (name) => {
    alert(`Generating report for ${name}`);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleSearch = () => {
    // The filtering is already being done in the filteredEmployees variable
    // This function can be used to trigger any additional actions on search
    console.log("Search triggered");
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const isDateInRange = (date, startDate, endDate) => {
    const employeeDate = new Date(date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || employeeDate >= start) && (!end || employeeDate <= end);
  };

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        employee.jobTitle.includes(jobTitleFilter) &&
        isDateInRange(employee.date, startDate, endDate)
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-8 bg-white w-full">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-yellow-400">Employee</span> Management
      </h1>

      <div className="relative flex items-center w-7/12 space-x-4 mb-4">
        {/* Keyword Input */}
        <div className="flex-2">
          <h2 className="mb-1 font-semibold">Keywords</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <FaSearch className="text-gray-400 absolute left-3 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 w-full border-none focus:outline-none"
              placeholder="Enter keywords"
            />
          </div>
        </div>

        {/* Job Title Filter */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Job Title</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <select
              className="w-full border-none focus:outline-none pl-2 pr-7 bg-transparent appearance-none"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
            >
              <option value="">Select Job Title</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Java Developer">Java Developer</option>
            </select>
            <FaChevronDown className="absolute right-3 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Date Range Input */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Date Range</h2>
          <div
            className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1 cursor-pointer"
            onClick={() => {
              const startDateInput = document.getElementById("startDate");
              if (startDateInput) startDateInput.focus();
            }}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
              className="w-full border-none focus:outline-none"
            />
            <span className="mx-2 text-gray-600">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              id="endDate"
              className="w-full border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="p-2 bg-yellow-400 text-black rounded-full flex items-center justify-center h-9 w-9 mt-7"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4 flex gap-6 items-center">
        <h2 className="text-xl font-semibold">Employee List</h2>
        <button
          className="flex items-center text-gray-600 border-2 p-1 px-3 rounded-2xl"
          onClick={() => handleSort("name")}
        >
          Sort By Name <FaSort className="ml-2 w-3" />
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-blue-50">
          <tr className="w-full border-b">
            <th
              className="text-left p-3 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
            </th>
            <th className="text-left p-3">Details</th>
            <th
              className="text-left p-3 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Joined on
            </th>
            <th
              className="text-left p-3 cursor-pointer"
              onClick={() => handleSort("jobTitle")}
            >
              Job Title
            </th>
            <th className="text-left p-3">Analysis</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b-2 shadow-md hover:bg-gray-50"
            >
              <td className="p-3">{employee.name}</td>
              <td className="p-3">
                <button
                  className="bg-blue-100 text-blue-500 border-blue-500 border-2 px-4 py-1 rounded-full text-sm hover:bg-blue-50 hover:border-blue-400 transition duration-300 ease-out"
                  onClick={() => handleView(employee)}
                >
                  View
                </button>
              </td>
              <td className="p-3">{employee.date}</td>
              <td className="p-3">{employee.jobTitle}</td>
              <td className="p-3">
                <button
                  className="text-purple-500 border-purple-500 border-2 px-3 py-1 rounded-full text-sm hover:bg-purple-50 transition duration-300 ease-out"
                  onClick={() => handleReport(employee.name)}
                >
                  Report
                </button>
              </td>
              <td className="p-3 flex space-x-2">
                <button className="text-blue-500">
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(employee.id)}
                >
                  <FaTrash />
                </button>
                <button className="text-blue-500">
                  <FaEnvelope />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Employee Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p>
              <strong>Job Title:</strong> {selectedEmployee.jobTitle}
            </p>
            <p>
              <strong>Joined on:</strong> {selectedEmployee.date}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedEmployee.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
