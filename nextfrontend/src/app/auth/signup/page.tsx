"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterResponse {
  token: string;
  message: string;
}

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // New state for success message
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success message before new attempt

    try {
      const response = await axios.post<RegisterResponse>(
        "http://localhost:4000/api/auth/register",
        {
          username,
          email,
          password,
          profileImage,
        }
      );

      // If registration is successful, set success message
      setSuccess("Registration successful! Redirecting to login page...");

      // Optionally store token, if provided
      if (response.data) {
        console.log(response.data);
      }

      // Redirect after a delay to show success message
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000); // 2 seconds delay before redirecting
    } catch (err: unknown) {
      setError("Invalid username, email, or password.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleRegister}
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          {/* Display error if present */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Display success message if present */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Username field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Email field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Profile Image field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profileImage"
            >
              Profile Image
            </label>
            <input
              id="profileImage"
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
