// will store all task-related API routes
// routes/tasks.js

// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// existing routes...

// GET /api/tasks - get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // fetch all tasks from DB
    res.json(tasks); // send tasks as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

//  POST /api/tasks — create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    // Validation: title is required
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Create new task
    const newTask = new Task({ title });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Find the task by ID and update fields
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true, runValidators: true } // return updated doc and run schema validation
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

