"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { setAdminToken } from "@/lib/api/admin.api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";
  const errorQuery = searchParams.get("error") || "";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (errorQuery === "admin_only") {
      setErrorMsg("Administrator Privileges Required. Please log in with an Admin account to access the Admin Portal.");
    } else if (errorQuery === "auth_required") {
      setErrorMsg("Please sign in to access this page.");
    }
  }, [errorQuery]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const isEmail = identifier.includes("@");
    const payload = isEmail
      ? { email: identifier.trim().toLowerCase(), password }
      : { phoneNumber: identifier.trim(), password };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            (res.status === 401
              ? "Invalid email/phone or password. Please verify your credentials or register a new account."
              : "Login failed.")
        );
      }

      // Save token for both general app and admin portal
      if (data.token) {
        setAdminToken(data.token);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          if (data.user) {
            localStorage.setItem("voyage_user", JSON.stringify(data.user));
          }
        }
      }

      // Check role if trying to access admin
      if (redirectPath.startsWith("/admin") && data.user?.role !== "admin") {
        throw new Error(
          `Signed in as "${data.user?.email || data.user?.name}" (Role: ${data.user?.role || "user"}), but role 'admin' is required to access the Admin Portal.`
        );
      }

      setSuccessMsg("Login successful! Redirecting...");

      setTimeout(() => {
        if (redirectPath) {
          router.push(redirectPath);
        } else if (data.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#f3e5ab] flex items-center justify-center text-[#0a1526] font-extrabold text-base shadow-md">
            V
          </div>
          <span className="font-bold text-heading text-lg tracking-wider">
            MAKE YOUR OWN VOYAGE
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-heading tracking-tight">
          Sign In to Your Account
        </h1>
        <p className="mt-1 text-xs text-muted">
          Access your bookings, concierge inquiries, and enterprise portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <MaterialIcon name="error" size={18} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Access & Auth Notice:</span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <MaterialIcon name="check_circle" size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
              >
                Email Address or Phone Number *
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. admin@makeyourownvoyage.com or +91 9876543210"
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-heading uppercase tracking-wider block"
                >
                  Password *
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-[#c49f27] transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In →</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-border/60 text-center text-xs text-muted">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
