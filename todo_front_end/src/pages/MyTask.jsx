import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
import './Pages.css'
import axios from 'axios';
import toast from 'react-hot-toast';
function MyTask() {
  const[visible,setVisible]=useState(false)
  const[update,setUpdated]=useState()
  const[tasks,setTasks]=useState([])
  const[users,setUsers]=useState([])
  // handler for getting the task created by specified user and setTasks in tasks



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
      <th scope="col">Assigned To</th>
      <th scope="col">Function</th>
    </tr>
  </thead>
  <tbody>
    {/* {tasks?.map(task=>( */}
    <tr>
      <td>Task1</td>
      <td>assignee</td>
      <td>
        <button className='update-button' onClick={()=>{setVisible(true); setUpdated()}}><FiEdit/></button> {/* id set krni hai task ki  */}
        <button className='delete-button' onClick={()=>{handledelete()}}><MdDelete/></button> {/* task id set krni hai */}
      </td>
    </tr>
    {/* ))} */}
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
          />
          <label>User Assigned</label>
          <input type='text'
          className='form-input'
          //value daalni h assigned to
          disabled
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
          />
        <button className="button" type='submit'>Update</button>
        </form>
        </Modal>
      </Layout>
    </div>
  )
}

export default MyTask