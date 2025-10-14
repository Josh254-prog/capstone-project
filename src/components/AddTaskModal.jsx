import React, { useState } from "react";
import { addTask } from "../modules/tasks/taskService";
import { useTaskContext } from "../context/TaskContext";

const AddTaskModal = () => {
  const { setTasks } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, completed: false };
    const data = await addTask(newTask);
    if (data) {
      setTasks((prev) => [...prev, ...data]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskModal;
