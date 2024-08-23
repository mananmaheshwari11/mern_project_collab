import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import axios from 'axios'
import { useAuth } from './Auth/Authcontext'
import moment from 'moment'
import './Schedule.css'
import { Modal } from 'antd'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Schedule = () => {
  const[filter,setFilter]=useState("")
  const[tasks,setTasks]=useState([])
  const[updatefilter,setUpdate]=useState([])
  const[flaunt,setFlaunt]=useState("")
  const[visibletask,setVisibletask]=useState(false)
  const[auth]=useAuth()
  const fetchUserTask=async()=>{
    try {
      const usertask=await axios.get(`/api/task/usertask/${auth?.user?.id}`)
      if(usertask.data.success){
        setTasks(usertask.data.tasks)

      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUserTask();
    //eslint-disable-next-line
  },[]);

  const completeTask=async()=>{
    try {
      const userId=auth?.user?.id;
      const {data}=await axios.post(`/api/task/completetask/${flaunt._id}`,{userId});
      if(data.success){
        window.location.reload();
        toast.success(data.message,{duration:4000});
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  const handleTaskFilter=(e)=>{
    try {
      const data=e.target.value;
      setFilter(data)
      const date=moment();
      const filteredtasks=tasks.filter(task=>{
        const dueDate=moment(task.dueDate);
        if(filter==="assigned" && dueDate.isSameOrBefore(date)){
          return true;
        }
        if(filter==="missed" && dueDate.isAfter(date)){
          return true;
        }
        return false
      })
      setUpdate(filteredtasks)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div>
      <div className="row mb-3">
        <div className="col-md-4">
          <h4 className='schedule-task'>Select Option to View the Task</h4>
          <select
            className="form-select"
            value={filter}
            onChange={handleTaskFilter}

          >
            <option value="">Select Filter</option>
            <option value="assigned" selected>Assigned</option>
            <option value="missed">Missed</option>
          </select>
        </div>
      </div>
      {updatefilter.length>0?<>
    {filter==="missed"?<h1 className='home-title'>Missed Task</h1>:<h1 className='home-title'>Assigned Task</h1>}
      {updatefilter?.map((task) => (
  <ul className="list-group" key={task._id}>
    <li className="list-group-item">
      <div className="task-content">
        <Link className="task-name" onClick={()=>{setVisibletask(true); setFlaunt(task);}}>{task.name}</Link>
        <span className="task-date" style={{color: filter==="missed"?"red":"green"}}>{moment(task.dueDate).format("DD/MM/YYYY")}</span>
      </div>
    </li>
  </ul>
))}
</>:
<>
<h1 className='home-title'>No Task Available</h1>
</>}
</div>
<Modal onCancel={()=>setVisibletask(false)} open={visibletask} footer={null}>
    <h1 className='page-title'>Task Details</h1>
    <label>Task Name</label>
    <h4>{flaunt.name}</h4>
    <label>Due Date</label>
    <h4>{moment(flaunt.dueDate).format('DD-MM-YYYY')}</h4>
    <label>Created By</label>
    <h4>{flaunt.assignedBy?.name}</h4>
    <label>Task Description</label>
    <input className="form-input" placeholder='Ask creator for description' disabled/>
    <button type='submit' onClick={completeTask} className='button'>
            Mark As Completed
          </button>
  </Modal>
  
    </Layout>
  )
}

export default Schedule