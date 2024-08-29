import React from 'react'
import Sidebar from '../../components/Sidebar'
import RequestManagement from '../../components/hr-components/RequestManagement'

const RequestManagementPages = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <RequestManagement/>
    </div>
  )
}

export default RequestManagementPages