import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
import './Pages.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './Auth/Authcontext';
import moment from 'moment';
function MyTask() {
  const[visible,setVisible]=useState(false)
  // const[update,setUpdated]=useState()
  const[tasks,setTasks]=useState([])
  const[users,setUsers]=useState([])
  const[name,setName]=useState("")
  const[select,setSelected]=useState([])
  const[dueDate,setDate]=useState("")
  const [auth]=useAuth()
  // handler for getting the task created by specified user and setTasks in tasks
  const getusercreatedTask=async()=>{
    try{
    const {data}=await axios.get(`/api/task/usercreatedtask/${auth?.user?.id}`)
    if(data.success){
      setTasks(data.tasks)
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
      console.log(error)
  }
  }

  useEffect(()=>{
    getusercreatedTask();
    //eslint-disable-next-line
  },[])

  // getting all the users
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
  // handler for deleting task
  const handledelete=async(id)=>{
    try {
      const {data} =await axios.delete(`/api/task/delete/${id}`)
      if(data){
        toast.success("Task deleted successfully")
      }
      else{
        toast.error("Error in task deletion")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Layout>
          <div className='page-container'>
            <div className="page-title">Created Task</div>
            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Task</th>
      <th scope="col">Created At</th>
      <th scope="col">Function</th>
    </tr>
  </thead>
  <tbody>
    {tasks?.map(task=>(
    <tr>
      <td>{task.name}</td>
      <td>{moment(task.createdAt).format("DD-MM-YYYY")}</td>
      <td>
        <button className='update-button' onClick={()=>{setVisible(true); setName(task.name); setSelected(task.assignedTo);  setDate(task.dueDate)}}><FiEdit/></button> 
        <button className='delete-button' onClick={()=>{handledelete(task._id)}}><MdDelete/></button> {/* task id set krni hai */}
      </td>
    </tr>
    ))} 
    </tbody>
    </table>
          </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
        <h1 className='page-title'>Update Task</h1>
        {/* sabme value daalni h bcoz update me value dikhni chaiye */}
        <form>
          <input type='text'
          className='form-input'
          placeholder='Enter title of task'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <label>User Assigned</label>
          <input type='text'
          className='form-input'
          value={select?.map(s=>(
            <h4>{s.name}</h4>
          )).join(", ")}
          readOnly
          />
          <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          Alter Assigned User
          </button>
          <ul className="dropdown-menu">
            {users?.map((u) => (
              <div className="form-check" key={u._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={u._id}
                  id={`checkbox-${u._id}`}
                  // onChange={handleSelectChange}
                />
                <label className="form-check-label" htmlFor={`checkbox-${u._id}`}>
                  {u.name}
                </label>
              </div>
            ))}
          </ul>
        </div>
          <input type='date'
          className='form-input'
          placeholder='Enter Due Date'
          value={moment(dueDate).format("YYYY-MM-DD")}
          onChange={(e)=>setDate(e.target.value)}
          />
        <button className="button" type='submit'>Update</button>
        </form>
        </Modal>
      </Layout>
    </div>
  )
}

export default MyTask