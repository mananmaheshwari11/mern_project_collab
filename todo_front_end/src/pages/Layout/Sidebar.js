import React from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/Authcontext'
import toast from 'react-hot-toast'
const Sidebar = () => {
  const[auth,setAuth]=useAuth();
  const navigate=useNavigate();
  const handleLogout=(e)=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    toast.success("Logout Successfully",{duration:2000})
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  return (
<div className="sidebar">
      <Link to="/user/home" className="sidebar-link">Home</Link>
      <Link to="/user/create" className="sidebar-link">Create Task</Link>
      <Link to="/user/my-task" className="sidebar-link">My Created Task</Link>
      <Link to="/user/missed" className="sidebar-link">Task Schedule</Link>
      <Link to='/user/profile' className='sidebar-link'>{auth?.user?.name}</Link>
      <Link onClick={handleLogout} className='sidebar-link'>Logout</Link>
    </div>
  )
}

export default Sidebar