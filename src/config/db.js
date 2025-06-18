// src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected…');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Ensure this is a default export
export default connectDB;
