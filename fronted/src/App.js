import React, { useEffect, useState } from "react";
import "./App.css";
import { FiEdit, FiTrash2, FiCheck, FiPlus } from "react-icons/fi";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos:", err));
  }, []);

  const handleAddTask = () => {
    const trimmed = task.trim();
    if (!trimmed) return;

    axios.post(API_URL, { text: trimmed })
      .then(res => {
        setTodos([res.data, ...todos]);
        setTask("");
      })
      .catch(err => {
        if (err.response?.data?.error) {
          alert("⚠️ " + err.response.data.error);
        } else {
          console.error(err);
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const toggleComplete = (todo) => {
    axios.put(`${API_URL}/${todo._id}`, {
      text: todo.text,
      completed: !todo.completed
    }).then(res => {
      setTodos(todos.map(t => (t._id === todo._id ? res.data : t)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    axios.put(`${API_URL}/${id}`, {
      text: trimmed
    })
    .then(res => {
      setTodos(todos.map(t => (t._id === id ? res.data : t)));
      setEditingId(null);
      setEditText("");
    })
    .catch(err => {
      if (err.response?.data?.error) {
        alert("⚠️ " + err.response.data.error);
      } else {
        console.error(err);
      }
    });
  };

  return (
    <div className="container">
      <h1>📝 Aniket To-Do List</h1>

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

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />

            {editingId === todo._id ? (
              <input
                type="text"
                className="edit-input"
                value={editText}
                autoFocus
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(todo._id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo._id)}
              />
            ) : (
              <span className={todo.completed ? "done" : ""}>
                {todo.text}
              </span>
            )}

            <div className="actions">
              {editingId === todo._id ? (
                <button title="Save" onClick={() => saveEdit(todo._id)}>
                  <FiCheck />
                </button>
              ) : (
                <button title="Edit" onClick={() => startEditing(todo)}>
                  <FiEdit />
                </button>
              )}
              <button title="Delete" onClick={() => deleteTask(todo._id)}>
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
