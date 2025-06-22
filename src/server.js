// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';
import helmet from 'helmet';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express application
const app = express();

// Middleware setup
app.use(helmet()); // Use Helmet to secure your app with various HTTP headers
app.use(cors());   // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies for incoming requests

// Routes
app.use('/api/todos', todoRoutes); // Use the todo routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error response
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
