// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST new todo
router.post("/", async (req, res) => {
  const { text } = req.body;
  const existing = await Todo.findOne({ text: { $regex: new RegExp(`^${text}$`, "i") } });
  if (existing) return res.status(400).json({ error: "Task already exists" });

  const newTodo = new Todo({ text });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// PUT (update) todo
router.put("/:id", async (req, res) => {
  const { text, completed } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { text, completed },
    { new: true }
  );
  res.json(updated);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
