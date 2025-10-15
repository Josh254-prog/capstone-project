import React, { useState } from "react";
import { addTask } from "./taskService";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault(); // prevents page reload
    if (!title) return alert("Please enter a task title");

    const newTask = {
      title,
      description,
      completed: false,
      created_at: new Date(),
    };

    const result = await addTask(newTask);
    if (result) {
      setTitle("");
      setDescription("");
      onTaskAdded && onTaskAdded(); // refresh list if provided
    }
  };

  return (
    <form onSubmit={handleAddTask}>
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
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
