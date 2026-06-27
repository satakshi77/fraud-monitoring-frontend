import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { login } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
export default function LoginForm() {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      loginUser(
        res.data.user,
        res.data.accessToken
      );

      localStorage.setItem(
        "token",
        res.data.accessToken
      );
      toast.success("Login successful!");
      navigate("/dashboard");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
   <div className="space-y-4">

      <input
        className="w-full px-4 py-3 border border-slate-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full px-4 py-3 border border-slate-300 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          className="
            w-40
            bg-blue-600
            text-white
            py-2.5
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
          "
        >
          Login
        </button>
      </div>
    </div>
  );
}