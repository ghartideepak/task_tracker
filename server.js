// main file where Express and server run


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());

// Middleware: allows Express to read JSON in requests
app.use(express.json());

// Routes: all /api/tasks requests go to routes/tasks.js
app.use('/api/tasks', taskRoutes);

//authorization
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
