import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.due_date || "No date"}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default TaskCard;

