"use client";
import React, { useState } from "react";

/* ================= ICONS ================= */
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-teal-400"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Sobre */}
    <rect x="3" y="5" width="18" height="14" rx="2" />
    {/* Solapa */}
    <polyline points="3,6 12,13 21,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <rect x="3" y="11" width="18" height="10" rx="2" />{" "}
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
  </svg>
);
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />{" "}
    <circle cx="12" cy="12" r="3" />{" "}
  </svg>
);
const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M2 12s4-7 10-7c2.2 0 4.2.7 6 1.8" />{" "}
    <path d="M22 12s-4 7-10 7c-2.2 0-4.2-.7-6-1.8" />{" "}
    <line x1="1" y1="1" x2="23" y2="23" />{" "}
  </svg>
);

/* ================= COMPONENT ================= */
export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputBase =
    "w-full pl-12 pr-3 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none";

  /* ===== VALIDACIONES ===== */
  const handleStep1 = () => {
    if (!fullName.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2 = () => {
    if (!email) return setError("El email es obligatorio");
    if (!password) return setError("La contraseña es obligatoria");
    if (password.length < 8)
      return setError("La contraseña debe tener al menos 8 caracteres");
    if (password !== confirmPassword)
      return setError("Las contraseñas no coinciden");
    setError("");
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("El nombre es obligatorio");
      setStep(1);
      return;
    }

    setIsLoading(true);

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      window.location.href = "/auth/login";
    } catch {
      setError("Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50">
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldIcon />
          </div>
          <h2 className="text-3xl font-bold text-center">Crear cuenta</h2>
          <p className="text-slate-500 text-center">Paso {step} de 3</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="min-h-[20px]">
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          {step === 1 && (
            <>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  placeholder="Usuario123"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputBase}
                />
              </div>

              <button
                type="button"
                onClick={handleStep1}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium"
              >
                Continuar
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputBase} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputBase}
                />
              </div>

              <button
                type="button"
                onClick={handleStep2}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium"
              >
                Continuar
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="bg-slate-100 rounded-lg p-4 text-sm space-y-1">
                <p>
                  <strong>Nombre:</strong> {fullName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-medium"
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
