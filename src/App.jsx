import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "../src/pages/employee-pages/Home";
import HrHomePage from "../src/pages/hr-pages/HrHomePage";
import BenefitsPage from "../src/pages/employee-pages/BenefitsPage";
import HiringProcess from "./pages/hr-pages/HiringProcess";
import Document from "./pages/employee-pages/Document";
import JobPostingPage from "./pages/hr-pages/JobPostingPage";
import ApplicantTrackingPage from "./pages/hr-pages/ApplicantTrackingPage";
import RequestManagementPage from "./pages/hr-pages/RequestManagementPage"
import EmployeeManagementPage from "./pages/hr-pages/EmployeeManagementPage";
import SalesHomePage from "./pages/sales-pages/SalesHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hr-home" element={<HrHomePage />} />
        <Route path="/hiring-processes" element={<HiringProcess />} />
        <Route path="/notifications" element={<Home />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/documents" element={<Document/>} />
        <Route path="/hiring-processes/job-posting" element={<JobPostingPage />} />
        <Route path="/hiring-processes/ats" element={<ApplicantTrackingPage />} />
        <Route path="/hr/request-management" element={<RequestManagementPage />} />
        <Route path="/hr/employee-management" element={<EmployeeManagementPage />} />
        <Route path="/sales-home" element={<SalesHomePage />} />

      </Routes>
    </Router>
  );
}

export default App;
