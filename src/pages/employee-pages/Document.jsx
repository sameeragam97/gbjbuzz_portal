import React from 'react'
import Sidebar from '../../components/Sidebar'
import DocumentTable from '../../components/employee-components/DocumentTable'

const Document = () => {
  return (
    <div className="flex">
    <Sidebar />
    <DocumentTable/>
  </div>
  )
}

export default Document
