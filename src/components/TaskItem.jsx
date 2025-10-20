import { supabase } from "../utils/supabaseClient";
import { useTasks } from "../context/TaskContext";

export default function TaskItem({ task }) {
  const { setTasks } = useTasks();

  const toggleComplete = async () => {
    await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = async () => {
    await supabase.from("tasks").delete().eq("id", task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <li className="flex items-start gap-3 p-3 rounded-lg border hover:shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
        className="mt-1 h-4 w-4"
      />
      <div className="flex-1">
        <div className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </div>
        {task.description && <div className="text-sm text-gray-500">{task.description}</div>}
        <div className="text-xs text-gray-400 mt-1">
  {task.inserted_at
    ? new Date(task.inserted_at).toLocaleString()
    : "No date"}
</div>
      </div>
      <button onClick={deleteTask} className="px-2 py-1 border rounded text-red-600">
        Delete
      </button>
    </li>
  );
}
