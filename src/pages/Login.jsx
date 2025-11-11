import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPass(!showPass);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("moneyRoomsUser"));

    setTimeout(() => {
      if (!storedUser) {
        toast.error("No user found! Please sign up first.", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }

      if (
        storedUser.email === formData.email.trim() &&
        storedUser.password === formData.password.trim()
      ) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        // ✅ Store user in localStorage
        localStorage.setItem("moneyRoomsUser", JSON.stringify(storedUser));

        // ✅ Update App state
        setUser(storedUser);

        // ✅ Redirect to /home after toast
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error("Invalid email or password!", {
          position: "top-center",
        });
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.supaimg.com/f27c6130-082e-4bfc-abc0-f58d684717f3.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "80%",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6),rgba(0,0,0,0.9))]" />

      <div className="relative z-10 bg-[rgba(20,20,30,0.85)] border border-white/10 rounded-3xl p-8 w-[350px] text-center shadow-[0_0_25px_rgba(6,182,212,0.4)] animate-float">
        <img
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Arena X Logo"
          className="w-[100px] mx-auto mb-4 rounded-2xl drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulseLogo"
        />
        <h2 className="text-[26px] text-blue-500 mb-6 font-semibold drop-shadow-[0_0_10px_#3b82f6]">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-3 rounded-full bg-white/10 text-white text-sm outline-none placeholder:text-gray-400 focus:bg-white/15 focus:shadow-[0_0_10px_#06b6d4] transition-all"
          />
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-2 rounded-full bg-white/10 text-white text-sm outline-none placeholder:text-gray-400 focus:bg-white/15 focus:shadow-[0_0_10px_#06b6d4] transition-all"
          />

          <div
            onClick={togglePassword}
            className="flex items-center text-gray-300 text-sm mb-2 cursor-pointer select-none"
          >
            👁 {showPass ? "Hide Password" : "Show Password"}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-3 rounded-full text-white font-semibold transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-linear-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.9)]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-5">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Create one
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
