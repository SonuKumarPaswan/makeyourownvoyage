"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
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
          Set New Password
        </h1>
        <p className="mt-1 text-xs text-muted">
          Choose a secure new password for your Voyage account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
          {error && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <MaterialIcon name="error" size={18} />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <MaterialIcon name="check_circle" size={28} />
              </div>
              <h3 className="font-bold text-heading text-base">Password Updated!</h3>
              <p className="text-xs text-muted leading-relaxed">
                Your account password has been updated. You can now log in with your new credentials.
              </p>
              <Link
                href="/login"
                className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-[#d4af37] text-black text-xs font-semibold hover:bg-[#c49f27] transition"
              >
                Sign In Now →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
                >
                  New Password (min 6 characters) *
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
                >
                  Confirm New Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-heading rounded-lg outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-[#c49f27] transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                {loading ? "Updating Password..." : "Update Password →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
