import React from "react";

export default function Footer() {
  return (
    <footer className="h-12 bg-gray-100 text-sm text-gray-500 flex items-center justify-center">
      © {new Date().getFullYear()} Product App
    </footer>
  );
}
