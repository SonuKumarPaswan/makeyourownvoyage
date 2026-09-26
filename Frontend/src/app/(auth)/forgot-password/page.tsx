"use client";

import React, { useState } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
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
          Reset Your Password
        </h1>
        <p className="mt-1 text-xs text-muted">
          Enter your registered email address to receive password recovery instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <MaterialIcon name="mark_email_read" size={28} />
              </div>
              <h3 className="font-bold text-heading text-base">Check Your Inbox</h3>
              <p className="text-xs text-muted leading-relaxed">
                If an account exists for <strong className="text-heading">{email}</strong>, we have sent a secure password reset link.
              </p>
              <Link
                href="/login"
                className="inline-block mt-2 text-xs font-semibold text-primary hover:underline"
              >
                ← Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-heading uppercase tracking-wider block mb-1.5"
                >
                  Registered Email Address *
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-[#c49f27] transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link →"}
              </button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-muted hover:text-primary transition">
                  Remember your password? <strong className="text-primary font-semibold">Sign In</strong>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
