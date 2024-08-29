import React from "react";
import Sidebar from "../../components/Sidebar";
import BenefitsMainPage from "../../components/employee-components/BenefitsMainPage";

const BenefitsPage = () => {
  return (
    <div className="flex">
    <Sidebar />
    <BenefitsMainPage/>
  </div>
  )
}

export default BenefitsPage