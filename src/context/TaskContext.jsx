import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 Fetch tasks for current user
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("inserted_at", { ascending: false });

      if (error) console.error(error.message);
      else setTasks(data || []);
      setLoading(false);
    };

    fetchTasks();

    // 🔹 Real-time updates with duplicate prevention
    const channel = supabase
      .channel("tasks_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          if (payload.new?.user_id === user.id) {
            if (payload.eventType === "INSERT") {
              setTasks((prev) => {
                const exists = prev.some((t) => t.id === payload.new.id);
                if (exists) return prev; // ✅ Avoid duplicates
                return [payload.new, ...prev];
              });
            } else if (payload.eventType === "UPDATE") {
              setTasks((prev) =>
                prev.map((t) => (t.id === payload.new.id ? payload.new : t))
              );
            } else if (payload.eventType === "DELETE") {
              setTasks((prev) => prev.filter((t) => t.id !== payload.old.id));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // 🔹 Add new task
  const addTask = async (title, description) => {
    if (!title.trim()) return;
    const { error } = await supabase.from("tasks").insert([
      { title, description, user_id: user.id },
    ]);
    if (error) console.error("Add task error:", error.message);
  };

  // 🔹 Update existing task
  const updateTask = async (id, title, description) => {
    const { error } = await supabase
      .from("tasks")
      .update({ title, description })
      .eq("id", id);
    if (error) console.error("Update task error:", error.message);
  };

  // 🔹 Toggle completion
  const toggleTaskCompletion = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);
    if (error) console.error("Toggle task error:", error.message);
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("Delete task error:", error.message);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        user,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
