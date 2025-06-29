import express from "express";
import admin from 'firebase-admin';

const { Request, Response, NextFunction } = express; // Destructure types from express

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Headers:', req.headers); // <-- DEBUG

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Contains uid, email, etc.
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};