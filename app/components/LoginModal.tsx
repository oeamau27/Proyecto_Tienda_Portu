"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ open, onClose }: any) {
  const [tab, setTab] = useState("login");

  // CONTEXT USER
  const { setUser } = useUser();

  // ROUTER
  const router = useRouter();

  // LOGIN STATES
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // REGISTER STATES
  const [regName, setRegName] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");

  if (!open) return null;

  // 🔥 LOGIN HANDLER (ADMIN REDIRECT)
  function handleLogin() {
    if (!loginUser || !loginPass) {
      alert("Completa los campos");
      return;
    }

    const newUser = {
      username: loginUser,
      role: loginUser === "admin" ? "admin" : "cliente",
    };

    setUser(newUser);
    onClose();

    // SI ES ADMIN → REDIRIGE
    if (newUser.role === "admin") {
      router.push("/admin");
    }
  }

  // 🔥 REGISTER HANDLER
  function handleRegister() {
    if (!regName || !regUser || !regEmail || !regPass) {
      alert("Completa los campos obligatorios");
      return;
    }

    const newUser = {
      name: regName,
      username: regUser,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      role: "cliente",
    };

    setUser(newUser);
    onClose();
  }

  return (
    <>
      {/* Fondo Oscuro */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          fixed top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2
          w-[95%] max-w-md 
          bg-white rounded-2xl shadow-xl p-6 
          z-50
        "
      >
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

        {/* LOGIN */}
        {tab === "login" ? (
          <div className="mt-6 space-y-4">
            <Input
              label="Usuario o Email"
              placeholder="usuario o tu@email.com"
              value={loginUser}
              onChange={setLoginUser}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="•••••••"
              value={loginPass}
              onChange={setLoginPass}
            />

            {/* CUENTA DEMO */}
            <div className="p-3 bg-blue-100 rounded-lg text-black">
              <p className="font-bold">Cuenta de prueba Admin:</p>
              <p>Usuario: admin</p>
              <p>Contraseña: admin123</p>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-black text-white rounded-lg text-center font-semibold"
            >
              Iniciar Sesión
            </button>
          </div>
        ) : (
          /* REGISTRO */
          <div className="mt-6 space-y-4">
            <Input
              label="Nombre Completo"
              placeholder="Juan Pérez"
              value={regName}
              onChange={setRegName}
            />

            <Input
              label="Nombre de Usuario"
              placeholder="juanperez"
              value={regUser}
              onChange={setRegUser}
            />

            <Input
              label="Email"
              placeholder="tu@email.com"
              value={regEmail}
              onChange={setRegEmail}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••"
              value={regPass}
              onChange={setRegPass}
            />

            <Input
              label="Teléfono (opcional)"
              placeholder="+1 234 567 8900"
              value={regPhone}
              onChange={setRegPhone}
            />

            <Input
              label="Dirección (opcional)"
              placeholder="Calle 123, Ciudad"
              value={regAddress}
              onChange={setRegAddress}
            />

            <button
              onClick={handleRegister}
              className="w-full py-3 bg-black text-white rounded-lg text-center font-semibold"
            >
              Crear Cuenta
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* INPUT COMPONENT */
function Input({ label, placeholder, type = "text", value, onChange }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-black font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-black rounded-lg px-3 py-2 text-black placeholder-black"
      />
    </div>
  );
}
