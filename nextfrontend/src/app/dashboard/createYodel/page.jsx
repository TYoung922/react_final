"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const CreateYodel = () => {
  const [content, setContent] = useState(""); // State to hold the Yodel content
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [success, setSuccess] = useState(null); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true
    setError(null); // Clear any previous error messages
    setSuccess(null); // Clear any previous success messages

    try {
      const response = await fetch("http://localhost:4000/api/yodels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the JWT token if authentication is needed
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content }), // Send the content as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to create Yodel");
      }

      const data = await response.json(); // Parse the JSON response
      setSuccess("Yodel created successfully!"); // Set success message
      setContent(""); // Clear the input field
    } catch (error) {
      setError(error.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create a Yodel</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)} // Update content state
            placeholder="What's on your mind?"
            className="border rounded p-2 w-full h-40"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating..." : "Create Yodel"}
          </button>
        </form>
        {error && <p className="text-red-500">Error: {error}</p>}{" "}
        {/* Show error message */}
        {success && <p className="text-green-500">{success}</p>}{" "}
        {/* Show success message */}
      </div>
    </div>
  );
};

export default CreateYodel;
