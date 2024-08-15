import express from 'express';
const router = express.Router();
import Task from '../models/taskModel.js'
import userModel from '../models/userModel.js';


//Create Task
router.post('/', async (req, res) => {
    try {
        const assignedToUser = await userModel.findOne({ name: req.body.assignedTo });
        const assignedByUser = await userModel.findOne({ name: req.body.assignedBy });
        if (!assignedToUser || !assignedByUser) {
            return res.status(400).json({ error: "Invalid user names provided" });
        }

        req.body.assignedTo = assignedToUser._id;
        req.body.assignedBy = assignedByUser._id;

        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
  
// Read all Tasks
router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedBy', 'name').populate('assignedTo', 'name');
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Read single Task by ID
router.get('/:id', async (req, res) => {
try {
    const task = await Task.findById(req.params.id);
    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Update Task by ID
router.put('/:id', async (req, res) => {
try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Delete Task by ID
router.delete('/:id', async (req, res) => {
try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

export default router;
