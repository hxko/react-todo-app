// server.js

// --- IMPORTS ---
// Third-party modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import admin from 'firebase-admin';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import 'dotenv/config'; // Loads .env file variables into process.env

// Local modules (make sure file extensions are included)
import connectDB from './../backend/config/db.js';
import { router } from './../backend/routes/todoRoutes.js';
// Import your service account JSON using an import assertion
import serviceAccount from './../backend/firebase-service-account.json' with { type: 'json' };


// --- INITIALIZATION ---

// Initialize Express application FIRST
const app = express();

// Initialize Firebase Admin SDK
// This is the ONLY Firebase initialization needed on the backend.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB Database
connectDB();


// --- MIDDLEWARE SETUP ---

// Security middleware
app.use(
  helmet({
    crossOriginOpenerPolicy: false, // ⬅️ Deaktiviert COOP, erlaubt window.closed
  })
);


// CORS configuration to allow requests from your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Default to Vite's dev server port
  credentials: true
}));

// Body parser middleware to handle JSON payloads
app.use(express.json({ limit: '10kb' })); // Limit payload size to prevent attacks

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting to prevent brute-force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter); // Apply rate limiter to all API routes


// --- ROUTES ---

// Health check endpoint to verify the server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// Your application-specific routes
app.use('/api/todos', router);


// --- ERROR HANDLING ---

// 404 Handler for routes that are not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 UNHANDLED ERROR:', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Provide stack trace only in development environment
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});


// --- SERVER STARTUP ---

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ UNHANDLED REJECTION! Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful shutdown for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`❌ UNCAUGHT EXCEPTION! Shutting down... Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
