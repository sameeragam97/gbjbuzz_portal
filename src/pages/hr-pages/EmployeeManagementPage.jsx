import React from 'react'
import Sidebar from '../../components/Sidebar'
import EmployeeManagement from '../../components/hr-components/EmployeeManagement'

const EmployeeManagementPage = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <EmployeeManagement/>
    </div>
  )
}

export default EmployeeManagementPage