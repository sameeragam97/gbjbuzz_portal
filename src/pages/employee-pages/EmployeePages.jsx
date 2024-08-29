import React from 'react'
import Sidebar from '../../components/Sidebar'
import DocumentTable from '../../components/employee-components/EmployeeProfile'
import EmployeeProf from '../../components/employee-components/EmployeeProfile'

const Employeepages = () => {
  return (
    <div className="flex">
    <Sidebar />
    <EmployeeProf/>
  </div>
  )
}

export default Employeepages

