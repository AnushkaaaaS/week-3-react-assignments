function Task({ task, handleDelete, handleEdit }) {
  return (
    <div className="task">
      <h2>{task.title}</h2>
 
      <p>{task.description}</p>
 
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate}</p>
 
      <button onClick={() => handleEdit(task)}>
        Edit
      </button>
 
      <button onClick={() => handleDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
 
export default Task;