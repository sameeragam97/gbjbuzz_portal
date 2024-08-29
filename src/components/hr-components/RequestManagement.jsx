import React, { useState } from "react";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaUndo,
  FaInfoCircle,
} from "react-icons/fa";
import RequestCard from "./RequestCard"; // Adjust the path as necessary

const RequestManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Sagar Tayde",
      rate: "39%",
      reason: "Travelling home",
      date: "2024-08-03",
      status: "Pending",
      description: "Attending a family function in hometown.",
    },
    {
      id: 2,
      name: "Kabir Gopi",
      rate: "6%",
      reason: "Hair fixing",
      date: "2024-08-04",
      status: "Pending",
      description: "Appointment for hair treatment at salon.",
    },
    {
      id: 3,
      name: "Sarthak Kaka",
      rate: "8%",
      reason: "Gym injuries",
      date: "2024-08-05",
      status: "Pending",
      description: "Recovering from a minor gym-related injury.",
    },
    {
      id: 4,
      name: "Niraj Niraj",
      rate: "66%",
      reason: "Facial",
      date: "2024-08-06",
      status: "Pending",
      description: "Scheduled facial treatment at spa.",
    },
    {
      id: 5,
      name: "Sameer Agam",
      rate: "89%",
      reason: "Party",
      date: "2024-08-07",
      status: "Pending",
      description: "Attending a friend's birthday celebration.",
    },
    {
      id: 6,
      name: "Atharva Thakre",
      rate: "7%",
      reason: "Foreign tour",
      date: "2024-08-08",
      status: "Pending",
      description: "Going on a planned vacation to Europe.",
    },
    {
      id: 7,
      name: "Tejas Patil",
      rate: "11%",
      reason: "Library",
      date: "2024-08-09",
      status: "Pending",
      description: "Visiting the national library for research.",
    },
  ]);
  const [previousRequests, setPreviousRequests] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAccept = (id) => {
    setPreviousRequests(requests);
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
  };

  const handleReject = (id) => {
    setPreviousRequests(requests);
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  const handleUndo = () => {
    if (previousRequests) {
      setRequests(previousRequests);
      setPreviousRequests(null);
    }
  };

  const handleSearch = () => {
    let filteredRequests = requests;

    // Filter by search term
    if (searchTerm) {
      filteredRequests = filteredRequests.filter((request) =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      filteredRequests = filteredRequests.filter(
        (request) =>
          new Date(request.date) >= new Date(startDate) &&
          new Date(request.date) <= new Date(endDate)
      );
    }

    // Filter by status
    if (filter === "Approved") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === "Approved"
      );
    } else if (filter === "Rejected") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === "Rejected"
      );
    } else if (filter === "MostRequested") {
      filteredRequests = [...filteredRequests].sort(
        (a, b) => parseFloat(b.rate) - parseFloat(a.rate)
      );
    } else if (filter === "LeastRequested") {
      filteredRequests = [...filteredRequests].sort(
        (a, b) => parseFloat(a.rate) - parseFloat(b.rate)
      );
    }

    return filteredRequests;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
  };

  const filteredRequests = handleSearch();

  return (
    <div className="p-8 bg-white w-full">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-yellow-400">Request</span> Management
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 mb-8">
          <RequestCard
            bgColor="red-100"
            title="Total Request"
            count={requests.length}
            iconSize="3x"
          />
          <RequestCard
            bgColor="green-100"
            title="Request Accepted"
            count={requests.filter((req) => req.status === "Approved").length}
            iconSize="3x"
          />
          <RequestCard
            bgColor="blue-100"
            title="Request Denied"
            count={requests.filter((req) => req.status === "Rejected").length}
            iconSize="3x"
          />
        </div>
        <div className="bg-blue-50 rounded-3xl p-6">
          <div className="flex justify-between gap-4 mb-2 bg-white px-3 py-4 w-80 rounded-xl shadow-md">
            <p className="font-semibold">Request History</p>
            <div className="space-x-2">
              <button
                className={`px-2 py-1 rounded text-xs ${
                  filter === "Approved"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-200 text-gray-700"
                }`}
                onClick={() => setFilter("Approved")}
              >
                Approved
              </button>
              <button
                className={`px-2 py-1 rounded text-xs ${
                  filter === "Rejected"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-200 text-gray-700"
                }`}
                onClick={() => setFilter("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white px-3 py-2 w-80 rounded-xl shadow-md">
            <p className="text-sm text-blue-600">Analysis</p>
            <div className="space-y-2  flex flex-col w-32">
              <p
                className="text-sm text-blue-800 cursor-pointer"
                onClick={() => setFilter("MostRequested")}
              >
                Most Requested
              </p>
              <p
                className="text-sm text-blue-800 cursor-pointer"
                onClick={() => setFilter("LeastRequested")}
              >
                Least Requested
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative flex items-center w-7/12 space-x-4 mb-4">
        {/* Keyword Input */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Keywords</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <FaSearch className="text-gray-400 absolute left-3 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-7 w-full border-none focus:outline-none"
              placeholder="Enter keywords"
            />
          </div>
        </div>

        {/* Date Range Input */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold">Date Range</h2>
          <div className="relative flex items-center border-2 border-gray-300 rounded-full overflow-hidden px-3 py-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border-none focus:outline-none"
            />
            <span className="mx-2 text-gray-600">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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

      {/* Request Table */}
      <table className="w-full">
  <thead className="bg-blue-50">
    <tr>
      <th className="text-center p-3">Employee Name</th>
      <th className="text-center p-3">Attendance Rate</th>
      <th className="text-center p-3">Leave Request</th>
      <th className="text-center p-3">Description</th>
      <th className="text-center p-3">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredRequests.map((request) => (
      <tr
        key={request.id}
        className="border-b-2 shadow-md hover:bg-gray-50"
      >
        <td className="p-3 text-center">{request.name}</td>
        <td className="p-3 text-center">{request.rate}</td>
        <td className="p-3 text-center">{request.reason}</td>
        <td className="p-3 text-center">
          <button
            onClick={() => openModal(request)}
            className="text-blue-600 hover:text-blue-800 mx-auto"
          >
            <FaInfoCircle className="w-5 h-5" />
          </button>
        </td>
        <td className="p-3">
          <div className="flex justify-center space-x-2">
            {request.status === "Pending" && (
              <>
                <button
                  onClick={() => handleAccept(request.id)}
                  className="bg-green-100 text-green-600 rounded-full p-2 hover:bg-green-200"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200"
                >
                  <FaTimes />
                </button>
              </>
            )}
            {request.status === "Approved" && (
              <div className="flex items-center">
                <span className="text-green-600 mr-2">Approved</span>
                <button
                  onClick={handleUndo}
                  className="bg-yellow-100 text-yellow-600 rounded-full p-2 hover:bg-yellow-200"
                >
                  <FaUndo className="w-3 h-3" />
                </button>
              </div>
            )}
            {request.status === "Rejected" && (
              <div className="flex items-center">
                <span className="text-red-600 mr-2">Rejected</span>
                <button
                  onClick={handleUndo}
                  className="bg-yellow-100 text-yellow-600 rounded-full p-2 hover:bg-yellow-200"
                >
                  <FaUndo className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Leave Request Details</h2>
            <p><strong>Employee:</strong> {selectedRequest.name}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Date:</strong> {selectedRequest.date}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestManagement;