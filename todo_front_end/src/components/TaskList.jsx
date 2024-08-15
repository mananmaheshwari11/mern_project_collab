import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasklist.css'
const TaskList = () => {
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
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
             <div className={`task-card ${false ? 'completed' : ''}`}>
             <h2>{task.name}</h2>
             <p className="due-date">Due Date: {task.dueDate}</p>
             <div className="assignee-completed">
               <p className="assignee">Assigned to: {task.assignedTo.name}</p>
               <div className="completed-checkbox">
               </div>
             </div>
           </div>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
