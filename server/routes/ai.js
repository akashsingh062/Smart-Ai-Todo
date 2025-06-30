import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Todo from '../models/Todo.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/summarize', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    
    if (todos.length === 0) {
      return res.json({ summary: "You don't have any tasks yet. Start by adding your first task!" });
    }

    const todoList = todos.map(todo =>
      `- ${todo.text} (Priority: ${todo.priority}, Category: ${todo.category}, Status: ${todo.completed ? 'Completed' : 'Pending'})`
    ).join('\n');

    const prompt = `You are a helpful assistant that summarizes todo lists. Provide a concise, encouraging summary of the user's tasks, highlighting priorities and progress.\n\nPlease summarize this todo list:\n${todoList}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error('AI service error:', error);
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

router.post('/prioritize', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id, completed: false });
    
    if (todos.length === 0) {
      return res.json({ suggestions: "No pending tasks to prioritize!" });
    }

    const todoList = todos.map(todo =>
      `- ${todo.text} (Current Priority: ${todo.priority}, Category: ${todo.category}${todo.dueDate ? `, Due: ${todo.dueDate.toDateString()}` : ''})`
    ).join('\n');

    const prompt = `You are a productivity expert. Analyze the todo list and suggest how to prioritize tasks based on urgency, importance, and deadlines. Be specific and actionable.\n\nPlease suggest how to prioritize these tasks:\n${todoList}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    res.json({ suggestions });
  } catch (error) {
    console.error('AI service error:', error);
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

router.post('/subtasks', authenticateToken, async (req, res) => {
  try {
    const { todoId, taskText } = req.body;
    
    const prompt = `You are a task management expert. Break down a task into smaller, actionable subtasks. Respond with ONLY a valid JSON array of strings, where each string is a subtask. Do not include any other text or explanations. For example: ["Subtask 1", "Subtask 2", "Subtask 3"]\n\nBreak down this task into 3-5 smaller subtasks: "${taskText}"`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json"
        }
    });
    const response = await result.response;
    const aiResponse = response.text();


    let subtasks;
    try {
      let parsedResponse = JSON.parse(aiResponse);
      if (Array.isArray(parsedResponse)) {
        subtasks = parsedResponse;
      } else if (parsedResponse.subtasks && Array.isArray(parsedResponse.subtasks)) {
        subtasks = parsedResponse.subtasks;
      } else {
        throw new Error("AI response is not a valid subtask array.");
      }
      
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      subtasks = aiResponse
        .split('\n')
        .filter(line => line.trim() && line.startsWith('-') || line.startsWith('*'))
        .map(line => line.replace(/^[-*]\s*/, '').trim())
        .slice(0, 5);
      
    }
    
    if (!subtasks || subtasks.length === 0) {
      return res.status(500).json({ message: 'AI failed to generate subtasks.' });
    }

    if (todoId) {
      const todo = await Todo.findOneAndUpdate(
        { _id: todoId, userId: req.user._id },
        { 
          $set: { subtasks: subtasks.map(text => ({ text, completed: false })) }
        },
        { new: true }
      );
      
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      res.json({ todo });
    } else {
      res.status(400).json({ message: 'todoId is required' });
    }
  } catch (error) {
    console.error('AI service error:', error);
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
});

export default router;