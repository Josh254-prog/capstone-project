import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { user, setTasks } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ user_id: user.id, title, description }])
      .select();
    if (!error && data?.[0]) setTasks((prev) => [data[0], ...prev]);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300"
      />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium">
        Add Task
      </button>
    </form>
  );
}
