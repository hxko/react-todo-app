import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors()) // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON requests

// Use the todo routes
app.use('/api/todos', todoRoutes);

// TODO put PORT in environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
