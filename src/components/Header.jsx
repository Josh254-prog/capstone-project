import React from "react";
import { supabase } from "../utils/supabaseClient";

const Header = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header>
      <h1>My To-Do List</h1>
      <div>
        <button>Add Task</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
