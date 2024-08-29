import React from "react";
import Sidebar from "../../components/Sidebar";
import MainPage from "../../components/hr-components/MainPage";
import RightSidebar from "../../components/employee-components/RightSidebar";

const HrHomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainPage />
      <RightSidebar />
    </div>
  );
};

export default HrHomePage;
