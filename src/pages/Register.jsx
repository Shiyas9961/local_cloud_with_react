import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    if (!form.email || !form.firstName || !form.password) {
      return "Email, First Name and Password are required";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("first_name", form.firstName);
      data.append("last_name", form.lastName);
      data.append("password", form.password);
      if (form.image) data.append("image", form.image);

      await api.post("users", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Account created successfully 🎉");

      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          if(error.response.data.username){
            toast.error("Username already exists");
          } else if (error.response.data.email){
            toast.error("Email already exists");
          }
            else if (error.response.data.password){
            toast.error("Password must be at least 8 characters containing a number and a special character");
          } else {
          toast.error("Invalid input. Please check your details");
          }
        } else if (status === 409) {
          toast.error("User already exists");
        } else if (status >= 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error("Registration failed");
        }
      } else {
        // Network / CORS / server down
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[95%] md:w-full max-w-lg p-8 rounded-xl shadow-sm"
      >
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Create account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to get started
        </p>

        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-700">
            Profile Image (optional)
          </label>

          <div className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="cursor-pointer px-4 py-2 bg-gray-100 border rounded-lg text-sm hover:bg-gray-200 transition"
            >
              Choose Image
            </label>

            <span className="text-sm text-gray-500">
              {form.image ? form.image.name : "No file selected"}
            </span>
          </div>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
        </div>

        <div className="mb-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            name="firstName"
            placeholder="First name"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
          <input
            name="lastName"
            placeholder="Last name (optional)"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
        </div>

        <div className="mb-6">
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            onChange={onChange}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
