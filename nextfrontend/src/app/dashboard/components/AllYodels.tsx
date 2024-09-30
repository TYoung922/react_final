"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Yodel {
  id: number;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
  // Add other fields from your API response if needed
}

const AllYodels = () => {
  const [yodels, setYodels] = useState<Yodel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYodels = async () => {
      try {
        const response = await axios.get<Yodel[]>(
          "http://localhost:4000/api/yodels"
        );
        setYodels(response.data);
      } catch (err: unknown) {
        setError("Error fetching yodels");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchYodels();
  }, []);

  if (loading) return <p>Loading yodels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6">AllYodels</h1> */}
      <div className="space-y-4">
        {yodels.length > 0 ? (
          yodels.map((yodel) => (
            <div key={yodel.id} className="border rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold">{yodel.author.username}</p>
              <p className="text-gray-600">{yodel.content}</p>
              <small className="text-gray-500">
                {new Date(yodel.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No yodels found</p>
        )}
      </div>
    </div>
  );
};

export default AllYodels;
