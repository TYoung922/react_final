"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Search = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [results, setResults] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true

    try {
      const response = await fetch(
        `http://localhost:3000/api/yodels/search?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json(); // Parse the JSON response
      setResults(data); // Set the search results
      setError(null); // Clear any previous errors
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
        <h1 className="text-2xl font-bold mb-4">Search Yodels</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query state
            className="border rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
          >
            Search
          </button>
        </form>
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && <p className="text-red-500">Error: {error}</p>}{" "}
        {/* Show error message */}
        {results.length > 0 && (
          <ul className="mt-4">
            {results.map((yodel, index) => (
              <li key={index} className="border-b py-2">
                <p>{yodel.content}</p>{" "}
                {/* Adjust according to your Yodel structure */}
                <small>By User ID: {yodel.userId}</small> {/* Example field */}
              </li>
            ))}
          </ul>
        )}
        {results.length === 0 && !loading && !error && <p>No results found.</p>}{" "}
        {/* No results message */}
      </div>
    </div>
  );
};

export default Search;
