// routes/todoRoutes.js
import express from 'express';
import Todo from '../models/Todo.js'; // Ensure to include the .js extension
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes now require authentication
router.use(authenticate);

// Create - Now includes user ID and is more secure
router.post('/', async (req, res) => {
  try {
    // 1. Destructure ONLY the properties you expect from the client.
    const { title, completed } = req.body;

    // 2. Build the new Todo object with trusted data.
    const todo = new Todo({
      title: title,
      // Provide a default for 'completed' if it's not sent
      completed: typeof completed === 'boolean' ? completed : false,
      // 3. Use the userId from the auth middleware, NOT from the body.
      userId: req.user.uid
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    // This will now only trigger for genuine validation errors (e.g., empty title)
    res.status(400).json({ message: error.message });
  }
});

// Read - Only get todos for current user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.uid });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update - Verify user owns todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete - Verify user owns todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router };