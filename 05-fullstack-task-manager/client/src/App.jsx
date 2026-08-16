import { useEffect, useState } from "react";
import Task from "./Task";
import "./App.css";
 
function App() {
  const [tasks, setTasks] = useState([]);
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
 
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sort, setSort] = useState("");
 
  const [editingId, setEditingId] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    getTasks();
  }, []);
 
  function getTasks() {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
 
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks");
        setLoading(false);
      });
  }
 
  function addTask(e) {
    e.preventDefault();
 
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
 
    const task = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      dueDate: dueDate
    };
 
    if (editingId) {
      fetch(`http://localhost:5000/api/tasks/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
 
          return res.json();
        })
        .then((data) => {
          setTasks(
            tasks.map((task) =>
              task.id === editingId ? data : task
            )
          );
 
          clearForm();
        })
        .catch(() => {
          alert("Failed to update task");
        });
    } else {
      fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
 
          return res.json();
        })
        .then((data) => {
          setTasks([...tasks, data]);
          clearForm();
        })
        .catch(() => {
          alert("Failed to add task");
        });
    }
  }
 
  function handleDelete(id) {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
 
        return res.json();
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => {
        alert("Failed to delete task");
      });
  }
 
  function handleEdit(task) {
    setEditingId(task.id);
 
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  }
 
  function clearForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
  }
 
  let filteredTasks = tasks.filter((task) => {
    const searchMatch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
 
    const statusMatch =
      statusFilter === "all" || task.status === statusFilter;
 
    const priorityMatch =
      priorityFilter === "all" ||
      task.priority === priorityFilter;
 
    return searchMatch && statusMatch && priorityMatch;
  });
 
  if (sort === "title") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }
 
  if (sort === "priority") {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3
    };
 
    filteredTasks = [...filteredTasks].sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );
  }
 
  if (loading) {
    return <h2>Loading...</h2>;
  }
 
  if (error) {
    return <h2>{error}</h2>;
  }
 
  return (
    <div className="container">
      <h1>Task Manager</h1>
 
      <form onSubmit={addTask}>
        <h2>{editingId ? "Edit Task" : "Add Task"}</h2>
 
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
 
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
 
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
 
        <button type="submit">
          {editingId ? "Update Task" : "Add Task"}
        </button>
 
        {editingId && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>
 
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
 
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
 
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
 
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
 
      <div className="tasks">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
 
export default App;