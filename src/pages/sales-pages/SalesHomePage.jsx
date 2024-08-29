import React from 'react'
import Sidebar from '../../components/Sidebar'
import MainPage from '../../components/sales-component/MainPage';

const SalesHomePage = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <MainPage/>
    </div>
  )
}

export default SalesHomePage