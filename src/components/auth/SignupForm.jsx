import { useState } from "react";
import { signup } from "../../services/auth";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    try {
      await signup(form);
      alert("Account created. Please login.");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
   <div className="space-y-4">

  <input
    className="w-full px-4 py-3 border border-slate-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="Name"
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  <input
    className="w-full px-4 py-3 border border-slate-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="Email"
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  <input
    type="password"
    className="w-full px-4 py-3 border border-slate-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="Password"
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  <div className="flex justify-center">
    <button
      onClick={handleSignup}
      className="
        w-40
        bg-green-600
        text-white
        py-2.5
        rounded-lg
        font-medium
        hover:bg-green-700
        transition
      "
    >
      Sign Up
    </button>
  </div>

</div>
  );
}