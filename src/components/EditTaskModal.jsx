import React, { useState } from "react";
import { updateTask } from "../modules/tasks/taskService";
import { useTaskContext } from "../context/TaskContext";

const EditTaskModal = ({ task }) => {
  const { setTasks } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updated = await updateTask(task.id, { title, description });
    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, title, description } : t))
      );
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        placeholder="Edit title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Edit description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTaskModal;
