import React, { useEffect, useState } from 'react'
 //import TaskList from '../components/TaskList'
import Layout from './Layout/Layout'
import axios from 'axios';
import moment from 'moment';
import './Home.css'
import { useAuth } from './Auth/Authcontext';
import toast from 'react-hot-toast';
import { Modal } from "antd"
function Home() {
  const [tasks, setTasks] = useState([]);
  const [usertasks,setuserTask]=useState([]);
  const [auth]=useAuth();
  const[visibletask,setVisibletask]=useState(false)
  const[visiblemytask,setVisiblemytask]=useState(false)
  const[flaunt,setFlaunt]=useState("")
  useEffect(() => {
    // Fetch tasks from the backend
    const fetchallTasks = async () => {
      try {
        const response = await axios.get('/api/task/'); // Adjust the URL if necessary
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchallTasks();
  }, []);

  const fetchUserTask=async()=>{
    try {
      const usertask=await axios.get(`/api/task/usertask/${auth?.user?.id}`)
      if(usertask.data.success){
        toast.success(usertask.message)
        setuserTask(usertask.data.tasks)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUserTask();
    //eslint-disable-next-line
  },[])
  return (
    <div>
      <Layout>
      <h1 className='home-title'>One Notes</h1>
        <div className="d-flex">
      {tasks.map((task) => (
        <>
      <div className="card" style={{ width: "18rem" }} onClick={()=>{setVisibletask(true); setFlaunt(task)} } >
      <div className="card-body">
      <h5 className="card-title">{task.name}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">{moment(task.dueDate).format('DD-MM-YYYY')}</h6>
      <p className="card-text">
      Assigned By:{task.assignedBy.name}
    </p>
  </div>
  </div>
    </>
      ))}
    </div>
  <hr/>
  <h1 className='home-title'>Task Assigned to me</h1>
  <div className="d-flex">
  {usertasks?.map((task)=>(
  <div className="card" style={{ width: "18rem" }} onClick={()=>{setVisiblemytask(true); setFlaunt(task)} }>
  <div className="card-body">
    <h5 className="card-title">{task.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{moment(task.dueDate).format('DD-MM-YYYY')}</h6>
    <p className="card-text assignedTo">
      {console.log(task.assignedBy)}
      Assigned By:{task.assignedBy.name}
    </p>
    <button className="complete-button">Complete</button>
  </div>
</div>
))}
</div>
  <Modal onCancel={()=>setVisibletask(false)} open={visibletask} footer={null}>
    <h1 className='page-title'>Task Details</h1>
    <label>Task Name</label>
    <h4>{flaunt.name}</h4>
    <label>Due Date</label>
    <h4>{moment(flaunt.dueDate).format('DD-MM-YYYY')}</h4>
    <label>Created By</label>
    <h4>{flaunt?.assignedBy?.name}</h4>
    <label>People working on it</label>
    {flaunt?.assignedTo?.map((p)=>(
      <h5>{p.name}</h5>
    ))}
    <label>Task Description</label>
    <input className="form-input" placeholder='Ask creator for description' disabled/>
  </Modal>

  <Modal onCancel={()=>setVisiblemytask(false)} open={visiblemytask} footer={null}>
    <h1 className='page-title'>Task Details</h1>
    <label>Task Name</label>
    <h4>{flaunt.name}</h4>
    <label>Due Date</label>
    <h4>{moment(flaunt.dueDate).format('DD-MM-YYYY')}</h4>
    <label>Created By</label>
    <h4>{flaunt?.assignedBy?.name}</h4>
    <label>Task Description</label>
    <input className="form-input" placeholder='Ask creator for description' disabled/>
  </Modal>
  </Layout>
    </div>
  )
}

export default Home