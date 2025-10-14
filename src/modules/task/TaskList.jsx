import React, { useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { getTasks } from "./taskService";
import TaskCard from "../../components/TaskCard";

const TaskList = () => {
  const { tasks, setTasks } = useTaskContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, [setTasks]);

  return (
    <div>
      <h2>Task List</h2>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};

export default TaskList;
