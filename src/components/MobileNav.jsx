import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function MobileNav({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 top-0 h-full w-64 bg-white p-4 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            to="/"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            to="/products"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            Products
          </Link>

          <Link
            to="/users"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            Users
          </Link>
        </nav>
      </div>
    </div>
  );
}
