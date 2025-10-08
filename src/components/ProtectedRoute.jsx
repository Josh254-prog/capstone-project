import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If user is logged in → allow access, else redirect to homepage
  return user ? children : <Navigate to="/" replace />;
}

