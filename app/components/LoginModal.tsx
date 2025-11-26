"use client";

import { useState } from "react";

export default function LoginModal({ open, onClose }: any) {
  const [tab, setTab] = useState("login");

  if (!open) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="
        fixed top-1/2 left-1/2 
        transform -translate-x-1/2 -translate-y-1/2
        w-[95%] max-w-md 
        bg-white rounded-2xl shadow-xl p-6 
        z-50
      ">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-black">
              Bienvenido a Tienda de Barrio "Portu"
            </h2>
            <p className="text-black/80 text-sm">
              Inicia sesión o crea una cuenta para una mejor experiencia
            </p>
          </div>

          <button onClick={onClose} className="text-xl text-black">
            ✖
          </button>
        </div>

        {/* TABS */}
        <div className="flex w-full">
          <button
            onClick={() => setTab("login")}
            className={`
              flex-1 py-2 rounded-xl font-semibold
              ${tab === "login" ? "bg-black text-white" : "bg-black/10 text-black"}
            `}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => setTab("register")}
            className={`
              flex-1 py-2 rounded-xl font-semibold
              ${tab === "register" ? "bg-black text-white" : "bg-black/10 text-black"}
            `}
          >
            Crear Cuenta
          </button>
        </div>

        {/* CONTENIDO */}
        {tab === "login" ? (
          <>
            {/* Login */}
            <div className="mt-6 space-y-4">

              {/* Usuario */}
              <div className="flex flex-col">
                <label className="text-black font-semibold">Usuario o Email</label>
                <input
                  type="text"
                  placeholder="usuario o tu@email.com"
                  className="border border-black rounded-lg px-3 py-2 text-black placeholder-black"
                />
              </div>

              {/* Contraseña */}
              <div className="flex flex-col">
                <label className="text-black font-semibold">Contraseña</label>
                <input
                  type="password"
                  placeholder="•••••••"
                  className="border border-black rounded-lg px-3 py-2 text-black placeholder-black"
                />
              </div>

              {/* Cuenta demo */}
              <div className="p-3 bg-blue-100 rounded-lg text-black">
                <p className="font-bold">Cuenta de prueba Admin:</p>
                <p>Usuario: admin</p>
                <p>Contraseña: admin123</p>
              </div>

              <button className="w-full py-3 bg-black text-white rounded-lg text-center font-semibold">
                Iniciar Sesión
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Registro */}
            <div className="mt-6 space-y-4">

              <Input label="Nombre Completo" placeholder="Juan Pérez" />
              <Input label="Nombre de Usuario" placeholder="juanperez" />
              <Input label="Email" placeholder="tu@email.com" />
              <Input label="Contraseña" placeholder="••••••" type="password" />
              <Input label="Teléfono (opcional)" placeholder="+1 234 567 8900" />
              <Input label="Dirección (opcional)" placeholder="Calle 123, Ciudad" />

              <button className="w-full py-3 bg-black text-white rounded-lg text-center font-semibold">
                Crear Cuenta
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* Input reutilizable */
function Input({ label, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-black font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-black rounded-lg px-3 py-2 text-black placeholder-black"
      />
    </div>
  );
}
