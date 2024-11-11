"use client";

import React, { useState } from "react";
import { showToast } from "@/utils/toast";
import Link from "next/link";
import { useRequestResetPasswordMutation } from "@/slices/apiSlice";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetPassword, { isLoading, isSuccess, isError }] =
    useRequestResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        user_email: email,
      }).unwrap();
      showToast("Password reset link sent to your email", "success");
      setEmail(""); // Clear the email input after success
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600">
          Enter your email address below, and we'll send you a link to reset
          your password.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label mb-0">
              <span className="text-black">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input input-bordered w-full focus:outline-none focus:ring transition duration-150 bg-teal-100 text-black placeholder-grey ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-white font-semibold hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
