"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logOut } from "../lib/firebaseAuth";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load current user on component mount
  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      console.log("Loaded User in Header:", currentUser); // Debugging log
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logOut();
    setUser(null); // Reset user state after logout
    router.push("/"); // Redirect to home page after logging out
  };

  return (
    <header className="bg-gray-300 p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        >
          NEXTY E-Commerce
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">
                Welcome, {user.email || "User"}
              </span>{" "}
              {/* Fallback to 'User' if displayName is not set */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1 hover:text-blue-500 transition duration-300"
              >
                <FaUser className="text-lg text-black" />
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
