"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { setAdminToken } from "@/lib/api/admin.api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      password,
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      if (data.token) {
        setAdminToken(data.token);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          if (data.user) {
            localStorage.setItem("voyage_user", JSON.stringify(data.user));
          }
        }
      }

      setSuccessMsg("Account created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during registration.");
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
          Create Your Voyage Account
        </h1>
        <p className="mt-1 text-xs text-muted">
          Register to book luxury trips, manage inquiries, and access exclusive privileges
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <MaterialIcon name="error" size={18} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Registration Error:</span>
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@makeyourownvoyage.com"
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
              >
                Phone Number (10-15 digits) *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 7291000328"
                className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
              >
                Password (min 6 characters) *
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
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
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register Account →</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-border/60 text-center text-xs text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
