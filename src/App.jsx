import { useTasks } from "./context/TaskContext";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";

export default function App() {
  const { user, loading } = useTasks();
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  return user ? <TodoPage /> : <AuthPage />;
}
