import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
