import React from 'react'
import Sidebar from '../../components/Sidebar'
import JobPostingMainPage from '../../components/hr-components/JobPostingMainPage'

const JobPostingPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <JobPostingMainPage/>
    </div>  )
}

export default JobPostingPage