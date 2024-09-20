import React from 'react'
import Sidebar from '../../components/Sidebar'
import EmployeeTasks from '../../components/employee-components/EmployeeTasks'
import RightSidebar2 from '../../components/employee-components/RightSIdebar2';
const Employeepages = () => {
  return (
    <div className="flex">
    <Sidebar />
    <EmployeeTasks/>
    <RightSidebar2/>
  </div>
  )
}

export default Employeepages