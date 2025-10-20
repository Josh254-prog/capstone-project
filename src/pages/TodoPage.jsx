import { supabase } from "../utils/supabaseClient";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function TodoPage() {
  const { user, tasks, loading } = useTasks();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold">My To-Do List</h2>
            <p className="text-sm text-gray-500">Organize tasks — simple, fast & synced</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">{user.email}</div>
            <button onClick={signOut} className="ml-3 px-3 py-1 rounded-md border">
              Sign out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <TaskForm />
          {loading ? (
            <div>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks yet — add one above.</p>
          ) : (
            <ul className="space-y-3 mt-4">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
