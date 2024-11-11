"use client";

import { useRegisterUserMutation } from "@/slices/apiSlice";
import { setUser } from "@/store/authSlice";
import { showToast } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false); // For eye toggle

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = "User name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Email address is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setErrors("");
      const registerPayload = {
        user_name: formData.username,
        user_email: formData.email,
        user_password: formData.password,
        user_role: formData.role,
      };

      try {
        const registerUserResponse = await registerUser(
          registerPayload
        ).unwrap();
        dispatch(
          setUser({
            user: registerUserResponse.user,
            token: registerUserResponse.token,
          })
        );
        console.log("Registration successful:", registerUserResponse);
        showToast("Registration successful!", "success");
        router.push("/all-moments");
      } catch (error) {
        console.log("error", error);
        setErrors({
          general: error.data.message,
        });
        showToast(error.message || "Registration failed", "error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Create Your Moments
        </h2>
        <p className="text-center text-gray-600">
          Join our community and share your moments!
        </p>

        {successMessage && (
          <div className="p-2 text-green-600 text-center">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label mb-0">
              <span className="text-black">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`input input-bordered w-full focus:outline-none focus:ring transition duration-150 bg-teal-100 text-black placeholder-grey ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label mb-0">
              <span className="text-black">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full focus:outline-none focus:ring transition duration-150 bg-teal-100 text-black placeholder-grey ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
          </div>

          <div className="form-control relative">
            <label htmlFor="password" className="label mb-0">
              <span className="text-black">Password</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input input-bordered w-full focus:outline-none focus:ring transition duration-150 bg-teal-100 text-black placeholder-grey ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Create a password"
              />
              <div
                className={
                  errors.password
                    ? "absolute top-[35%] -translate-y-1/2 right-3 flex items-center cursor-pointer text-gray-500"
                    : "absolute top-[50%] -translate-y-1/2 right-3 flex items-center cursor-pointer text-gray-500"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="role" className="label mb-0">
              <span className="text-black">Role</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered w-full focus:outline-none focus:ring transition duration-150 bg-teal-100 text-gray-700 border-gray-300"
            >
              <option value="user" className="placeholder-black">
                User
              </option>
              <option value="admin" className="placeholder-black">
                Admin
              </option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center mt-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-white font-semibold hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          )}
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
