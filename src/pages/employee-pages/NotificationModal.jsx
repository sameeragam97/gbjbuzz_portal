import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ name, message, time, date, hasRedDot, isRead }) => (
  <div className="flex items-start p-4 border-b">
    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0"></div>
    <div className="flex-grow">
      <div className="flex justify-between items-center">
        <h3 className={`font-bold ${isRead ? "text-gray-500" : "text-black"}`}>{name}</h3>
        {hasRedDot && !isRead && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
      </div>
      <p className={`text-sm ${isRead ? "text-gray-400" : "text-gray-600"}`}>{message}</p>
      <p className="text-xs text-gray-400">{`${date} • ${time}`}</p>
    </div>
  </div>
);

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      name: "SANTI CAZORLA",
      message: "Please remember to submit your project updates by 5 PM today. Your efforts are...",
      date: "12 July 2024",
      time: "12:12 AM",
      hasRedDot: true,
      isRead: false,
    },
    {
      name: "GRANIT XHAXA",
      message: "Kindly coordinate with the finance team to finalize the budget by Friday. Reach out if a...",
      date: "12 July 2024",
      time: "11:40 AM",
      hasRedDot: false,
      isRead: true,
    },
    {
      name: "MARTIN ODEGAARD",
      message: "Please confirm receipt of the new policy document and implement the changes by Friday. Conta...",
      date: "12 July 2024",
      time: "10:21 AM",
      hasRedDot: true,
      isRead: false,
    },
    {
      name: "DARLENE ROBERTSON",
      message: "Kindly coordinate with the finance team to finalize the budget by Friday. Reach out if a...",
      date: "11 July 2024",
      time: "1:21 PM",
      hasRedDot: false,
      isRead: true,
    },
    {
      name: "GRANIT XHAXA",
      message: "Please remember to submit your project updates by 5 PM today. Your efforts are...",
      date: "11 July 2024",
      time: "10:10 AM",
      hasRedDot: false,
      isRead: false,
    },
    {
      name: "DARLENE ROBERTSON",
      message: "Please review the attached document and provide your feedback by tomorrow morning. We...",
      date: "10 July 2024",
      time: "11:11 AM",
      hasRedDot: false,
      isRead: false,
    },
  ]);

  const [filterOption, setFilterOption] = useState("latest"); // Default to latest first

  const handleClose = () => {
    onClose();
    navigate("/home");
  };

  const handleMarkAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
        hasRedDot: false, // Remove red dot when marked as read
      }))
    );
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  // Filter notifications based on the selected filter option
  const filteredNotifications = notifications.filter((notification) => {
    if (filterOption === "unread") return notification.hasRedDot; // Only include unread notifications
    return true; // Include all notifications if not filtering by unread
  });

  const sortedNotifications = filteredNotifications.slice().sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);

    // Sort by unread status first, then by date
    if (a.isRead === b.isRead) {
      return filterOption === "oldest" ? dateA - dateB : dateB - dateA; // Sort by date
    }
    return a.isRead ? 1 : -1; // Unread first
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mt-20">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="flex items-center">
            <button onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select onChange={(e) => handleFilterChange(e.target.value)} value={filterOption} className="border rounded p-1">
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="unread">Unread</option> {/* Added Unread option */}
            </select>
          </div>
          <button onClick={handleMarkAsRead} className="text-blue-500 font-semibold">
            Mark as Read
          </button>
        </div>
        <div className="overflow-y-auto max-h-96">
          {sortedNotifications.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
