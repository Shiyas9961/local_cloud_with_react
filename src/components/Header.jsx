import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-14 bg-black text-white flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Product App</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
