"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    console.log("Searching for:", query);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/yodels/search?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Unexpected data format:", data);
        setError("Received unexpected data format from server");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
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
            onChange={(e) => setQuery(e.target.value)}
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
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {results.length > 0 && (
          <div className="space-y-4 mt-4">
            {results.map((yodel, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <div className="flex items-center space-x-4">
                  {yodel.author?.profileImage ? (
                    <img
                      src={yodel.author.profileImage}
                      alt={`${yodel.author.username}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 text-gray-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <p className="text-lg font-semibold">
                    {yodel.author?.username || "Unknown"}
                  </p>
                </div>
                <p className="text-gray-600">{yodel.content}</p>
                <small className="text-gray-500">
                  {new Date(yodel.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
        {results.length === 0 && !loading && !error && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default Search;
