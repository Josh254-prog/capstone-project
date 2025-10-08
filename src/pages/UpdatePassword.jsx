import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

export default function UpdatePassword() {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully! Please log in.");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2s
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleUpdatePassword}>
        <h2 className="auth-heading">Update Password</h2>

        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="info-message">{message}</p>}

        <button type="submit" className="primary-btn">Update Password</button>
      </form>
    </div>
  );
}
