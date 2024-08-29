import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaFileAlt,
  FaGift,
  FaMoneyBillWave,
  FaBook,
  FaFileContract,
  FaCog,
  FaCommentDots,
} from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/arrow"); // Navigate to the "/arrow" route defined in App.jsx
  };

  const currentPath = location.pathname;

  return (
    <div
      className={`bg-[#E1AD01] text-black flex flex-col h-screen sticky top-0 transition-all duration-300 ease-out ${
        isExpanded ? "w-60" : "w-32"
      } `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {/* Logo Section */}
      <div style={{ flex: "0 0 5%" }} className="flex flex-col items-left p-2">
        <div className="text-l font-extrabold flex flex-col items-center">
          <div className="flex flex-col items-center p-2">
            <div className="text-m font-extrabold flex items-center">
              {isExpanded ? (
                <>
                  <span className="text-black">GBJBUZZ</span>
                  <span className="text-white"> PORTAL</span>
                </>
              ) : (
                <span className="text-black">
                  G<span className="text-white">P</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div
        style={{ flex: "0 0 15%" }}
        className="flex flex-col items-center mt-4"
      >
        <div
          className={`bg-black rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 ease-out ${
            isExpanded ? "w-16 h-16" : "w-12 h-12"
          } cursor-pointer`}
          onClick={handleProfileClick}
        >
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {isExpanded && (
          <div className="mt-2 text-center">
            <div
              style={{
                color: "black",
                fontSize: "0.875rem",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Shwetank Gopnarayan
            </div>
            <div
              style={{
                color: "#333",
                fontSize: "0.75rem",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Data Scientist
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Menu Section */}
      <div
        style={{ flex: "1 1 60%" }}
        className={`flex flex-col ${
          isExpanded ? "pl-3 pr-3" : "pl-1 pr-1"
        } mt-6`}
      >
        <ul className="list-none space-y-3">
          {[
            { Icon: FaHome, label: "Home", path: "/home" },
            { Icon: FaTasks, label: "Task", path: "/tasks" },
            { Icon: FaFileAlt, label: "My Documents", path: "/documents" },
            { Icon: FaGift, label: "Benefits", path: "/benefits" },
            { Icon: FaMoneyBillWave, label: "Payroll", path: "/payroll" },
            { Icon: FaBook, label: "Training Material", path: "/training" },
            { Icon: FaFileContract, label: "Policies", path: "/legal" },
            { Icon: FaCog, label: "Settings", path: "/settings" },
            { Icon: FaCommentDots, label: "Feedback", path: "/feedback" },
          ].map(({ Icon, label, path }) => (
            <li
              key={label}
              className={`flex items-center transition duration-300 ease-out rounded-full text-xl ${
                currentPath === path ? "bg-white" : ""
              } hover:bg-[#F1C40F] hover:text-black`}
            >
              <Link
                to={path}
                className={`flex items-center w-full ${
                  isExpanded ? "justify-start pl-2" : "justify-center"
                } text-xs text-black font-medium transition-all duration-300 ease-out`}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <Icon
                    className={`text-black transition-all duration-300 ease-out ${
                      isExpanded ? "w-6 h-6" : "w-5 h-5"
                    }`}
                  />
                </div>
                {isExpanded && <span className="ml-3 text-sm">{label}</span>}{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="py-4 mt-auto pl-10" style={{ height: "40%" }}>
        {isExpanded && (
          <button
            className="w-3/4 bg-black text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-[#b30000] transition duration-300 ease-out text-xs font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
