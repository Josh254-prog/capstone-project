import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function AuthForm() {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (authMode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">
        {authMode === "signin" ? "Welcome back" : "Create an account"}
      </h1>
      <form onSubmit={handleAuth} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300"
        />
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold">
          {authMode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        {authMode === "signin" ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => setAuthMode("signup")} className="text-indigo-600 font-medium">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setAuthMode("signin")} className="text-indigo-600 font-medium">
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
