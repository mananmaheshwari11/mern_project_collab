import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/Authcontext'
import toast from 'react-hot-toast'
const Sidebar = () => {
  const[auth,setAuth]=useAuth();
  const handleLogout=(e)=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    toast.success("Logout Successfully")
  }
  return (
<div className="sidebar">
      <Link to="/user/home" className="sidebar-link">Home</Link>
      <Link to="/user/create" className="sidebar-link">Create Task</Link>
      <Link to="/user/my-task" className="sidebar-link">My Task</Link>
      <Link to="/user/missed" className="sidebar-link">Missed</Link>
      <Link to='/user/profile' className='sidebar-link'>{auth?.user?.name}</Link>
      <Link to='/login' onClick={handleLogout} className='sidebar-link'>Logout</Link>
    </div>
  )
}

export default Sidebar