import React, { useEffect, useState } from 'react'
 //import TaskList from '../components/TaskList'
import Layout from './Layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

function Home() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/task/'); // Adjust the URL if necessary
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
    <Link to="#" className="card-link">
      Card link
    </Link>
    <Link to="#" className="card-link">
      Another link
    </Link>
  </div>
  </div>
    </>
      ))}
  <hr/>
  <div className="flex">
  <h1>My Task</h1>
  <Link to='/create'><FaPlus/></Link>
  </div>
  <div className="card" style={{ width: "18rem" }}>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p className="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <Link to="#" className="card-link">
      Card link
    </Link>
    <Link to="#" className="card-link">
      Another link
    </Link>
  </div>
  </div>


      </Layout>
    </div>
  )
}

export default Home