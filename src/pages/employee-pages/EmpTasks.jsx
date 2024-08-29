import React from 'react'
import Sidebar from '../../components/Sidebar'
import EmployeeTasks from '../../components/employee-components/EmployeeTasks'
import RightSidebar from '../../components/employee-components/RightSidebar'

const Employeepages = () => {
  return (
    <div className="flex">
    <Sidebar />
    <EmployeeTasks/>
    <RightSidebar/>
  </div>
  )
}

export default Employeepages