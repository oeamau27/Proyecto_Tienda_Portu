"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Aquí puedes limpiar tokens si usas login real
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm md:text-base"
      >
        Administrador ⌄
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
          <Link
            href="/cuenta"
            className="block px-4 py-2 hover:bg-gray-100 text-sm"
            onClick={() => setOpen(false)}
          >
            Mi Cuenta
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
