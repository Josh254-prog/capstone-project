import React, { useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { getTasks } from "./taskService";
import TaskCard from "../../components/TaskCard";
import AddTaskForm from "./AddTaskForm";

const TaskList = () => {
  const { tasks, setTasks } = useTaskContext();

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <AddTaskForm onTaskAdded={loadTasks} />
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;
