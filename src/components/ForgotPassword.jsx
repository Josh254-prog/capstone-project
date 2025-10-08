import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

export default function ForgotPassword() {
  const { supabase } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password", 
      // change to your production domain later
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent! Please check your email.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleForgotPassword}>
        <h2 className="auth-heading">Forgot Password</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="info-message">{message}</p>}

        <button type="submit" className="primary-btn">Send Reset Link</button>
      </form>
    </div>
  );
}
