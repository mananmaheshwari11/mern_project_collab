import React from 'react'
import Sidebar from './Sidebar'
import {Toaster } from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content">
        <Toaster/>
        {children}
      </div>
    </div>
  )
}

export default Layout