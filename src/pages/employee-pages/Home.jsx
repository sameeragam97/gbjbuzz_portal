import React from "react";
import Sidebar from "../../components/Sidebar";
import MainPage from "../../components/employee-components/MainPage";
import RightSidebar from "../../components/employee-components/RightSidebar";

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <MainPage/>
      <RightSidebar/>
    </div>
  );
}

export default Home;
