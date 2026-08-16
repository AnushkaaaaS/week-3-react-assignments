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
 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});