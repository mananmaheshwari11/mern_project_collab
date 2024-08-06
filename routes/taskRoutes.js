const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

//Create Task
router.post('/', async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
// Read all Tasks
router.get('/', async (req, res) => {
try {
    const tasks = await Task.find();
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


module.exports = router;
