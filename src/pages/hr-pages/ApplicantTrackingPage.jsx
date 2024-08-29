import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import ApplicantDirectory from '../../components/hr-components/ApplicantDirectory'
import InterviewScheduling from '../../components/hr-components/InterviewScheduling'
import Dashboard from '../../components/hr-components/Dashboard'

const ApplicantTrackingPage = () => {
  const [activeTab, setActiveTab] = useState('applicantDirectory')

  const renderContent = () => {
    switch (activeTab) {
      case 'applicantDirectory':
        return <ApplicantDirectory />
      case 'interviewScheduling':
        return <InterviewScheduling />
      case 'dashboard':
        return <Dashboard />
      default:
        return <ApplicantDirectory />
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className="p-12 bg-white w-full">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-yellow-400">Applicant</span> Tracking
        </h1>
        <div className="mb-6">
          <ul className="flex gap-7 text-sm font-semibold text-gray-500 mb-4">
            <li 
              onClick={() => setActiveTab('applicantDirectory')}
              className={activeTab === 'applicantDirectory' ? 'text-yellow-400 cursor-pointer' : 'cursor-pointer'}
            >
              Applicant Directory
            </li>
            <li 
              onClick={() => setActiveTab('interviewScheduling')}
              className={activeTab === 'interviewScheduling' ? 'text-yellow-400 cursor-pointer' : 'cursor-pointer'}
            >
              Interview Scheduling
            </li>
            <li 
              onClick={() => setActiveTab('dashboard')}
              className={activeTab === 'dashboard' ? 'text-yellow-400 cursor-pointer' : 'cursor-pointer'}
            >
              Dashboard
            </li>
          </ul>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default ApplicantTrackingPage