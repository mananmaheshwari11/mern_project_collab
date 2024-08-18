import React, { useEffect, useState } from 'react'
 //import TaskList from '../components/TaskList'
import Layout from './Layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import './Home.css'
function Home() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/task/'); // Adjust the URL if necessary
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div>
      <Layout>
        
      <h1 className='home-title'>One Notes</h1>
      {tasks.map((task) => (
        <>
      <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
      <h5 className="card-title">{task.name}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">{task.dueDate}</h6>
      <p className="card-text">
      Assigned To:{task.assignedTo.name}
    </p>
  </div>
  </div>
    </>
      ))}
  <hr/>
  <div className="card" style={{ width: "18rem" }}>
  <div className="card-body">
    <h5 className="card-title">Card Title</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">Due Date</h6>
    <p className="card-text assignedTo">
      Assigned To:
    </p>
    <button className="complete-button">Complete</button>
  </div>
</div>


      </Layout>
    </div>
  )
}

export default Home