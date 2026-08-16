const express = require("express");
const cors = require("cors");
const fs = require("fs");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
const file = "tasks.json";
 
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});
 
app.get("/api/tasks", (req, res) => {
  const data = fs.readFileSync(file);
  const tasks = JSON.parse(data);
 
  res.json(tasks);
});
 
app.get("/api/tasks/:id", (req, res) => {
  const data = fs.readFileSync(file);
  const tasks = JSON.parse(data);
 
  const task = tasks.find(
    (task) => task.id == req.params.id
  );
 
  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }
 
  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const data = fs.readFileSync(file);
  const tasks = JSON.parse(data);
 
  const { title, description, status, priority, dueDate } = req.body;
 
  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }
 
  if (!["todo", "in-progress", "done"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }
 
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority"
    });
  }
 
  const newTask = {
    id: tasks.length + 1,
    title: title,
    description: description || "",
    status: status,
    priority: priority,
    dueDate: dueDate || ""
  };
 
  tasks.push(newTask);
 
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
 
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const data = fs.readFileSync(file);
  const tasks = JSON.parse(data);
 
  const index = tasks.findIndex(
    (task) => task.id == req.params.id
  );
 
  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }
 
  const { title, description, status, priority, dueDate } = req.body;
 
  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }
 
  if (!["todo", "in-progress", "done"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }
 
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority"
    });
  }
 
  tasks[index] = {
    id: tasks[index].id,
    title: title,
    description: description || "",
    status: status,
    priority: priority,
    dueDate: dueDate || ""
  };
 
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
 
  res.json(tasks[index]);
});
 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});