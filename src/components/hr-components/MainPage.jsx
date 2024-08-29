import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "../employee-components/TaskItem.jsx";
import HrSectionItems from "./HrSectionItems.jsx";
import AnnouncementItem from "../employee-components/AnnouncementItem";
import ArrowsLeftIcon from "../../assets/icons/ArrowsLeftIcon.jsx";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon.jsx";
import NotificationModal from "../../pages/employee-pages/NotificationModal.jsx";

const announcements = [
  {
    title: "Winner of creativity challenge",
    message:
      "We are thrilled to announce that the winner of our Creative Challenge is none other than Elon Musk.",
  },
  {
    title: "New Project Launch",
    message:
      "We are excited to announce the launch of our new project this month.",
  },
  {
    title: "Company Event",
    message: "Join us for a company-wide event next Friday at 3 PM.",
  },
  {
    title: "Upcoming Webinar",
    message: "Don't miss our webinar on AI advancements next Wednesday.",
  },
  {
    title: "Health and Wellness",
    message: "Join our health and wellness program starting next month.",
  },
  {
    title: "Office Renovation",
    message: "Our office will undergo renovation next weekend.",
  },
];

const MainPage = ({ openNoti }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5); // Example count
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= announcements.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(announcements.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage
    );
  };

  const handleNotificationClick = () => {
    setIsModalOpen(true);
    setNotificationCount(0); // Reset the count after opening notifications
    navigate("/notifications");
  };

  const handleHrSectionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-8/12 p-3">
      <div className="flex justify-center gap-6 mb-6">
        <div className="w-3/5 flex flex-col justify-between">
          <div className="mb-7">
            <div className="flex gap-80 items-center">
              <p className="text-xl">Tuesday 8:00pm</p>
            </div>
            <p className="text-3xl">Good Morning Elon!</p>
          </div>
          <ul className="text-sm flex-grow">
            <TaskItem
              color="bg-red-400"
              label="Today's Task"
              description="Design UI for GBJBUZZ Portal"
            />
            <TaskItem
              color="bg-yellow-300"
              label="Returned Task"
              description="Research on Attendance System"
            />
            <TaskItem
              color="bg-blue-400"
              label="Meeting"
              description="10:00 AM : Sketch note Client Meet"
            />
            <TaskItem
              color="bg-purple-400"
              label="Project"
              description="Gbjbuzz Portal"
            />
          </ul>
        </div>
        <div className="w-1/3 mt-8 flex flex-col justify-between">
          <div className="flex flex-col items-center rounded-3xl p-3 h-full ">
            <p className="text-lg font-semibold mb-3">HR Section</p>
            <ul className="flex-grow cursor-pointer">
              <li onClick={() => handleHrSectionClick("/hiring-processes")}>
                <HrSectionItems message="Hiring Process" />
              </li>
              <li onClick={() => handleHrSectionClick("/hr/employee-management")}>
                <HrSectionItems message="Employee Management" />
              </li>
              <li onClick={() => handleHrSectionClick("/hr/request-management")}>
                <HrSectionItems message="Request Management" />
              </li>
              <li onClick={() => handleHrSectionClick("/hr/overall-analysis")}>
                <HrSectionItems message="Overall Analysis" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl px-7 py-4">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-slate-600 text-lg">Latest Announcements</p>
          <div className="flex">
            <button onClick={prevSlide}>
              <ArrowsLeftIcon />
            </button>
            <button onClick={nextSlide}>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((announcement, index) => (
              <AnnouncementItem
                key={index}
                title={announcement.title}
                message={announcement.message}
              />
            ))}
        </div>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainPage;
