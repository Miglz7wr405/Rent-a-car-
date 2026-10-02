"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-night-900 px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Suspense fallback={<div className="card p-8 text-center text-ink-400">A carregar…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search?.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setLoading(false);
    if (!result || result.error) {
      setError("Email ou password incorretos.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-400/15 text-amber-400">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-xl font-semibold">Área administrativa</h1>
          <p className="text-xs text-ink-400">Acesso restrito à equipa Kakeylka.</p>
        </div>
      </div>
      <label className="block">
        <span className="label">Email</span>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>
      <label className="block">
        <span className="label">Password</span>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error ? (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> A entrar…
          </>
        ) : (
          "Entrar"
        )}
      </button>
      <Link href="/" className="block text-center text-xs text-ink-400 hover:text-amber-400">
        Voltar ao site público
      </Link>
    </form>
  );
}
