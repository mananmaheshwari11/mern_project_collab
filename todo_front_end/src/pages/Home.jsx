import React, { useEffect, useState } from 'react'
 //import TaskList from '../components/TaskList'
import Layout from './Layout/Layout'
import axios from 'axios';
import moment from 'moment';
import './Home.css'
import { useAuth } from './Auth/Authcontext';
import toast from 'react-hot-toast';
import { Modal } from "antd"
import { Link } from 'react-router-dom';
function Home() {
  const [tasks, setTasks] = useState([]);
  const [usertasks,setuserTask]=useState([]);
  const [auth]=useAuth();
  const[visibletask,setVisibletask]=useState(false);
  const[visiblemytask,setVisiblemytask]=useState(false);
  const[flaunt,setFlaunt]=useState("");
  const[visibleCount, setVisibleCount] = useState(4);
  const[myvisibleCount, setmyVisibleCount] = useState(4);
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

//completion-handler
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


  const fetchUserTask=async()=>{
    try {
      const usertask=await axios.get(`/api/task/usertask/${auth?.user?.id}`)
      if(usertask.data.success){
        toast.success(usertask.data.message)
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
      {visibleCount < tasks.length && (
        <Link className="button-link" onClick={()=>setVisibleCount(visibleCount+4)}>
          Show more
        </Link>
      )}
      <hr/>
        <div className="d-flex flex-wrap">
      {tasks.slice(0,visibleCount).map((task) => (
        <>
      <div className="card" style={{ width: "12rem" }} onClick={()=>{setVisibletask(true); setFlaunt(task)} } >
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
  {usertasks.length>0?
  <>
  {myvisibleCount < usertasks.length && (
        <Link className="button-link" onClick={()=>setmyVisibleCount(myvisibleCount+4)}>
          Show more
        </Link>
      )}
      <hr/>
  <div className="d-flex flex-wrap">
  {usertasks?.slice(0,myvisibleCount).map((task)=>(
  <div className="card" style={{ width: "12rem" }} onClick={()=>{setVisiblemytask(true); setFlaunt(task)} }>
  <div className="card-body">
    <h5 className="card-title">{task.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{moment(task.dueDate).format('DD-MM-YYYY')}</h6>
    <p className="card-text assignedTo">
      Assigned By:{task.assignedBy.name}
    </p>
    <button className="button">Complete</button>
  </div>
</div>
))}
</div>
  </> :<>
  <h2 className='home-title-italic'>Relax!!No task at this moment.</h2>
  </>
  }
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
    <h4>{flaunt.assignedBy?.name}</h4>
    <label>Task Description</label>
    <input className="form-input" placeholder='Ask creator for description' disabled/>
    <button type='submit' onClick={completeTask}  className='button'>
            Mark As Completed
    </button>
  </Modal>
  </Layout>
    </div>
  )
}

export default Home