const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error getting the tasks', error });
    }
});

module.exports = router;
