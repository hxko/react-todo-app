// src/routes/todoRoutes.js
import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// Create a new todo
router.post('/', async (req, res) => {
  const { title, userId } = req.body;
  const newTodo = new Todo({ title, userId });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all todos for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send("Succesfully deleted todo");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
