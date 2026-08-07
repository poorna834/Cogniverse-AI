import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl font-black">Welcome Back</h1>
        <p className="mt-2 text-slate-400">Login to continue learning.</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
        />

        <button className="mt-6 w-full rounded-2xl bg-indigo-500 py-3 font-semibold hover:bg-indigo-400">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;