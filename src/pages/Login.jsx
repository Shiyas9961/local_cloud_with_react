import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password){
      toast.error("Username and password required");
      return;
    }

    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      navigate("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401){
          toast.error("Invalid username or password");
        } else if (status === 400) {
          toast.error("Bad request. Please check your input");
        } else if (status >= 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error("Login failed");
        }
      } else {
        // Network / CORS / server down
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm w-[90%] md:w-96"
      >
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Sign in
        </h1>

        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
