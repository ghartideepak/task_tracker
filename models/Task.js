// will store database model

// models/Task.js

const mongoose = require('mongoose');

// Define the Task schema (structure of a task)
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // cannot be empty
  },
  completed: {
    type: Boolean,
    default: false, // starts as not completed
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields automatically
});

// Export the model
module.exports = mongoose.model('Task', TaskSchema);


