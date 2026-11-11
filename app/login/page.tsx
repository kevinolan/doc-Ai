"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  const callbackError = params.get("error");
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-brand">MediFlow<span>AI</span></Link>
        <p className="auth-eyebrow">HOSPITAL OPERATIONS PLATFORM</p>
        <h1>Welcome back</h1>
        <p className="auth-description">Sign in to continue to your hospital workspace.</p>
        {callbackError && <div className="auth-error">Your sign-in link could not be completed. Please try again.</div>}
        {error && <div className="auth-error" role="alert">{error}</div>}
        {notice && <div className="auth-notice" role="status">{notice}</div>}
        <form onSubmit={signIn} className="auth-form">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@hospital.com" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
          <button className="primary-button auth-submit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="auth-footnote">Access is provided by your hospital administrator. Public self-registration is disabled in this MVP.</p>
        <Link href="/" className="auth-back">← Back to demo dashboard</Link>
      </section>
    </main>
  );
}
