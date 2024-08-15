import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/Authcontext'
const Sidebar = () => {
  const[auth]=useAuth();
  return (
<div className="sidebar">
      <Link to="/" className="sidebar-link">Home</Link>
      <Link to="/create" className="sidebar-link">Create Task</Link>
      <Link to="/my-task" className="sidebar-link">My Task</Link>
      <Link to="/missed" className="sidebar-link">Missed</Link>
      <Link to='/profile' className='sidebar-link'>{auth?.user?.name}</Link>
    </div>
  )
}

export default Sidebar