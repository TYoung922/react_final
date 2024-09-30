"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/auth/signup"); // Navigate to the signup page
  };

  const handleLogin = () => {
    router.push("/auth/login"); // Navigate to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Yodel</h1>
      <p className="text-lg mb-6">
        Post your thoughts and see what others have to say.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleSignUp}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
