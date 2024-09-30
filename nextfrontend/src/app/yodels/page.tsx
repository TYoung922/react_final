"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Yodal {
  id: number;
  content: string;
  createdAt: string;
  // Add other fields based on your API response
}

const Yodals = () => {
  const [yodals, setYodals] = useState<Yodal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYodals = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/yodels");
        setYodals(response.data);
      } catch (err) {
        setError("Error fetching posts");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchYodals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Yodals</h1>
      <ul>
        {yodals.map((yodal) => (
          <li key={yodal.id}>
            <p>{yodal.content}</p>
            <small>{new Date(yodal.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Yodals;
