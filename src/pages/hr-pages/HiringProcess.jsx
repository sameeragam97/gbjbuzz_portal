import React from "react";
import Sidebar from "../../components/Sidebar";
import HiringProcessMainPage from "../../components/hr-components/HiringProcessMainPage";

const HiringProcess = () => {
  return (
    <div className="flex">
      <Sidebar />
      <HiringProcessMainPage />
    </div>
  );
};

export default HiringProcess;
