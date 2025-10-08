import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, supabase } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Dashboard - Private Page</h1>
      <p>Welcome, {user?.email} 🎉</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
