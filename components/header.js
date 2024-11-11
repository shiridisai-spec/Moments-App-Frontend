"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ConfirmationDialog from "./confirmation-dialog";
import ProfileDropdown from "./settings-profile-dropdown";

const Header = () => {
  const dropdownRef = useRef(null);

  const pathname = usePathname();
  console.log("pathname", pathname);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get the current pathname from the router
  const currentPath = router.pathname;

  // Define a function to check if the link is active
  const isActiveLink = (path) => currentPath === path;

  console.log("currentPath", currentPath, "isActiveLink", isActiveLink);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenConfirmDialog = () => {
    handleOpenDialog();
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center p-1 bg-purple-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/all-moments">
          <h1 className="text-2xl font-bold text-purple-600">Momento</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/all-moments"
                className={`text-gray-700 hover:text-purple-600 transition duration-300 ${
                  pathname.startsWith("/all-moments")
                    ? "font-bold text-purple-600"
                    : ""
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/my-moments"
                className={`text-gray-700 hover:text-purple-600 transition duration-300 ${
                  pathname.startsWith("/my-moments")
                    ? "font-bold text-purple-600"
                    : ""
                }`}
              >
                My moments
              </Link>
            </li>
            <li ref={dropdownRef} className="relative">
              <div
                className="flex items-center text-gray-700 hover:text-purple-600 cursor-pointer transition duration-300"
                onClick={toggleDropdown}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-1" />
                Settings
              </div>
              {dropdownOpen && (
                <ProfileDropdown
                  handleOpenConfirmDialog={handleOpenConfirmDialog}
                  router={router}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Confirm Log Out"
        message="Are you certain you want to log out?"
        onConfirm={handleLogoutUser}
        onCancel={handleCloseDialog}
      />
    </header>
  );
};

export default Header;
