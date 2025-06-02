import React, { useState } from "react";
import "./App.css";
import { FiEdit, FiTrash2, FiCheck, FiPlus } from "react-icons/fi";


function App() {
  const initialState = [{
    text: "Learn Python",
    completed: true
  }, {
    text: "Learn Java",
    completed: false
  }, {
    text: "Learn React",
    completed: true
  }, {
    text: "Take shower",
    completed: false
  }, {
    text: "Cook food",
    completed: false
  },{
    text: "GYM",
    completed: false
  }
];
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    const trimmed = task.trim();
    if (!trimmed) return;

    const isDuplicate = todos.some(
      (todo) => todo.text.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      alert("⚠️ Task already exists!");
      return;
    }

    setTodos([...todos, { text: trimmed, completed: false }]);
    setTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    // If unchanged, cancel edit
    if (trimmed === todos[index].text) {
      setEditingIndex(null);
      setEditText("");
      return;
    }

    // Check for duplicate (excluding the current task)
    const isDuplicate = todos.some(
      (todo, i) =>
        i !== index && todo.text.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      alert("⚠️ Another task with this name already exists!");
      return;
    }

    const updated = [...todos];
    updated[index].text = trimmed;
    setTodos(updated);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1>📝 Aniket To-Do List</h1>

      {/* Input and add button */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          className="task-input"
        />
        <button className="add-btn" onClick={handleAddTask} title="Add Task">
          <FiPlus />
        </button>

      </div>

      {/* Tasks */}
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li className="todo-item" key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />

            {editingIndex === index ? (
              <input
                type="text"
                className="edit-input"
                value={editText}
                autoFocus
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(index);
                }}
              />
            ) : (
              <span className={todo.completed ? "done" : ""}>
                {todo.text}
              </span>
            )}

            <div className="actions">
              {editingIndex === index ? (
                <button title="Save" onClick={() => saveEdit(index)}>
                  <FiCheck />
                </button>
              ) : (
                <button title="Edit" onClick={() => startEditing(index)}>
                  <FiEdit />
                </button>
              )}
              <button title="Delete" onClick={() => deleteTask(index)}>
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
