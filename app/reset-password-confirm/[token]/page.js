"use client";
import { useConfirmResetPasswordMutation } from "@/slices/apiSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordConfirmPage = ({ params }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!params?.token) {
      setError("Invalid token");
    }
  }, [params?.token]);

  const [confirmResetPassword, { isLoading, isSuccess, isError }] =
    useConfirmResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await confirmResetPassword({
        token: params?.token,
        new_password: confirmPassword,
      }).unwrap();
      showToast("Password reset success", "success");
      router.push("/login");
      setEmail(""); // Clear the email input after success
      setError("");
    } catch (error) {
      console.log("error", error);
      setError("Error resetting password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>

        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 bg-teal-100 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 bg-teal-100 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
