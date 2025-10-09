import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { supabase, user } = useAuth();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (data) {
          setFullName(data.full_name);
        }
      }
    };

    fetchProfile();
  }, [user, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      {fullName ? (
        <p>Welcome, <strong>{fullName}</strong> 🎉</p>
      ) : (
        <p>Welcome, {user?.email}</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
