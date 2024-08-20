import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import axios from 'axios'
import './Pages.css'
import { useAuth } from './Auth/Authcontext'
import toast from 'react-hot-toast'
const CreateTask = () => {
    const[name,setName]=useState("")
    const[date,setDate]=useState("")
    const[users,setUsers]=useState([])
    const [auth]=useAuth()
    const[refresh,setRefresh]=useState(false)
    const[select,setSelectedUsers]=useState([])
    //handler to get all users
    const getusers=async()=>{
        try {
            const {data}=await axios.get('/api/auth/users');
            if(data.success){
                setUsers(data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getusers();
    },[])
    //handler to handle select box of user
    const handleSelectChange = (e) => {
        const userId = e.target.value;
        if (select.includes(userId)) {
          setSelectedUsers(select.filter(id => id !== userId));
        } else {
          setSelectedUsers([...select, userId]);
        }
      };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          const {data}=await axios.post(`/api/task/create/${auth?.user?.id}`,{name,date,select})
          if(data.success){
            toast.success(data.message)
          }
          if(!refresh){
            window.location.reload()
            toast.success("Create more task")
          }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
         <div className="page-container">
      <h1 className='page-title'>Create your Task</h1>
      <form className='page-forms' onSubmit={handleSubmit}>
        <h1 className='form-title'>Task Details</h1>
        <input 
          className='form-input' 
          placeholder='Enter your Task Title'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        {/* User Selection Dropdown */}
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          Select Users
          </button>
          <ul className="dropdown-menu">
            {users?.map((u) => (
              <div className="form-check" key={u._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={u._id}
                  id={`checkbox-${u._id}`}
                  onChange={handleSelectChange}
                />
                <label className="form-check-label" htmlFor={`checkbox-${u._id}`}>
                  {u.name}
                </label>
              </div>
            ))}
          </ul>
        </div>

        <input 
          type='date' 
          value={date}
          className='form-input'
          placeholder='Enter Due Date'
          onChange={(e) => setDate(e.target.value)}
        />
        
        {/* Submit Button */}
        <div>
          <button type='submit' className='button'>
            Create Task
          </button>
        </div>
      </form>
      <label>Do you want to create more than one Task. Click here to prevent screen refresh </label>
      <br></br><input type='checkbox' onClick={(e)=>setRefresh(true)}/> Prevent
    </div>
    </Layout>
  )
}

export default CreateTask