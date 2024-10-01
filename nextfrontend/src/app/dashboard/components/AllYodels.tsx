"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Yodel {
  id: number;
  content: string;
  createdAt: string;
  author: {
    username: string;
    profileImage: string;
    id: string;
  };
}

export default function AllYodels() {
  const [yodels, setYodels] = useState<Yodel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    const fetchYodels = async () => {
      if (!token) return;

      try {
        const response = await axios.get<Yodel[]>(
          "http://localhost:4000/api/yodels",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedYodels = response.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setYodels(sortedYodels);
      } catch (err: unknown) {
        setError("Error fetching yodels");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchYodels();
  }, [token]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!userId || !token) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${userId}/followList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const followedUsers = response.data;
        const status: Record<string, boolean> = {};
        followedUsers.forEach((user: { id: string }) => {
          status[user.id] = true;
        });
        setFollowStatus(status);
      } catch (err) {
        console.error("Error fetching follow list", err);
      }
    };

    fetchFollowStatus();
  }, [userId, token]);

  const handleFollow = async (authorId: string) => {
    if (!userId || !token) {
      console.error("User ID or token not found");
      return;
    }

    try {
      const isFollowing = followStatus[authorId];

      if (isFollowing) {
        await axios.post(
          `http://localhost:4000/api/user/${authorId}/unfollow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowStatus((prev) => ({ ...prev, [authorId]: false }));
      } else {
        await axios.post(
          `http://localhost:4000/api/user/${authorId}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowStatus((prev) => ({ ...prev, [authorId]: true }));
      }
    } catch (error) {
      console.error("Error toggling follow status", error);
    }
  };

  if (loading) return <p>Loading yodels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" max-w-md mx-auto p-4">
      <div className="space-y-4">
        {yodels.length > 0 ? (
          yodels.map((yodel) => (
            <div
              key={yodel.id}
              className="bg-white border rounded-md p-4 shadow-md"
            >
              <div className="flex items-center space-x-4">
                {yodel.author?.profileImage ? (
                  <img
                    src={yodel.author.profileImage}
                    alt={`${yodel.author.username}'s profile`}
                    className="w-10 h-10 rounded-full object-cover object-center"
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
                <p className="text-lg font-semibold">{yodel.author.username}</p>
                {yodel.author.id !== userId && (
                  <button
                    onClick={() => handleFollow(yodel.author.id)}
                    className="ml-auto font-extralight px-4 text-gray-500 hover:text-yellow-400 hover:underline"
                  >
                    {followStatus[yodel.author.id] ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <p className="text-gray-600 mt-2">{yodel.content}</p>
              <small className="text-gray-500 block mt-2">
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
}
