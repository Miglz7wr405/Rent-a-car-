import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { Logo } from "@/components/Logo";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError("Password incorrecta.");
      setPassword("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-night-950 px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="card space-y-5 p-8">
          <h1 className="font-display text-2xl font-semibold">Admin</h1>
          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
          )}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-ink-400">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              autoFocus
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">Entrar</button>
        </form>
      </div>
    </div>
  );
}
