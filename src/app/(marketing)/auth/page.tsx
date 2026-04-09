"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const [nextPath, setNextPath] = useState("/account");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("next");
    if (p) setNextPath(p);
    const ref = params.get("ref");
    if (ref?.trim()) localStorage.setItem("kabuki_pending_referral", ref.trim().toUpperCase());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Supabase is not configured.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Account created", {
          description: "If email confirmation is enabled, check your inbox before signing in.",
        });
        setMode("signin");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        return;
      }
      const pending =
        typeof window !== "undefined" ? localStorage.getItem("kabuki_pending_referral") : null;
      const bootstrapRes = await fetch("/api/auth/bootstrap-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pending ? { referralCode: pending } : {}),
      });
      if (!bootstrapRes.ok) {
        const payload = (await bootstrapRes.json().catch(() => ({}))) as { error?: string };
        toast.message("Signed in, but profile bootstrap needs attention.", {
          description: payload.error ?? "Please contact support if account data looks incomplete.",
        });
      } else if (pending) {
        localStorage.removeItem("kabuki_pending_referral");
      }
      toast.success("Signed in");
      router.push(nextPath);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-kabuki-grey py-16 sm:py-24">
      <div className="mx-auto max-w-md px-5 sm:px-8">
        <div className="rounded-[2rem] border border-kabuki-pink/25 bg-white/85 p-8 shadow-soft backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-kabuki-navy/45">
            Secure access
          </p>
          <h1 className="mt-3 font-display text-4xl text-kabuki-navy">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-kabuki-navy/70">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                autoComplete="email"
              />
            </label>
            <label className="block text-sm font-medium text-kabuki-navy/70">
              Password
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-kabuki-pink/30 px-4 py-3 text-kabuki-navy outline-none ring-kabuki-pink/40 focus:ring-2"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-kabuki-navy py-3.5 text-sm font-semibold text-white transition hover:bg-kabuki-navy/90 disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 w-full text-center text-sm font-medium text-kabuki-navy/60 underline-offset-4 hover:text-kabuki-navy hover:underline"
            onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          >
            {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
