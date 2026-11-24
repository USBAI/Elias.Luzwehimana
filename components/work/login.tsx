"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/work/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) }).catch(() => null);
    if (res?.ok) { router.refresh(); return; }
    setBusy(false);
    setError(res ? (await res.json().catch(() => ({}))).error ?? "Could not sign in." : "No connection.");
  };
  return (
    <main className="w-login">
      <form onSubmit={submit}>
        <p className="w-kicker">Private</p>
        <h1>Work</h1>
        <p className="w-sub">Sign in to your job tracker.</p>
        <label>Email<input name="email" type="email" autoComplete="username" required autoFocus /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        {error && <p className="w-error" role="alert">{error}</p>}
        <button className="w-btn w-btn-dark" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <a className="w-back" href="/">← Back to the portfolio</a>
      </form>
    </main>
  );
}
