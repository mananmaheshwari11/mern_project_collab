import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <li key={task._id}>
              <h3>{task.name}</h3>
              <p><strong>Assigned By:</strong> {task.assignedBy.name}</p> {/* Assuming User model has a 'name' field */}
              <p><strong>Assigned To:</strong> {task.assignedTo.name}</p>
              <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
