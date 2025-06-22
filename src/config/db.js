// Import necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log('MongoDB Connected…');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
