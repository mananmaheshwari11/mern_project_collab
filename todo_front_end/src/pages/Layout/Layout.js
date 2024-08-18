import React from 'react'
import Sidebar from './Sidebar'
import {Toaster } from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <Toaster/>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

export default Layout