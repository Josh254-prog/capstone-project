import { supabase } from "../../utils/supabaseClient";


// Fetch all tasks
export const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
  return data || [];
};

// Add a new task
export const addTask = async (task) => {
  const { data, error } = await supabase.from("tasks").insert([task]);
  if (error) console.error("Error adding task:", error.message);
  return data;
};

// Update an existing task
export const updateTask = async (id, updates) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);
  if (error) console.error("Error updating task:", error.message);
  return data;
};

// Delete a task
export const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) console.error("Error deleting task:", error.message);
};
