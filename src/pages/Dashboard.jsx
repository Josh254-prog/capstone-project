import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskList from "../modules/tasks/TaskList";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
