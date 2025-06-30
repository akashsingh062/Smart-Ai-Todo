import express from 'express';
import Todo from '../models/Todo.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all todos for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new todo
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { text, priority, category, dueDate } = req.body;
    
    const todo = new Todo({
      text,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId: req.user._id
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update todo
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete todo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear completed todos
router.delete('/completed/clear', authenticateToken, async (req, res) => {
  try {
    await Todo.deleteMany({ userId: req.user._id, completed: true });
    res.json({ message: 'Completed todos cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;