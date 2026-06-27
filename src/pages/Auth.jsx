import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

    
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {mode === "login" ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm text-blue-600 hover:underline"
          >
            {mode === "login"
              ? "New user? Create account"
              : "Already have an account? Login"}
          </button>
        </div>

      </div>
    </div>
  );
}