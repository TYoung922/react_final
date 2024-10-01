import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowedUsersList = () => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      const userId = localStorage.getItem("userId"); // Assuming you store userId in local storage
      const token = localStorage.getItem("token"); // Assuming you store the JWT in local storage

      if (!userId || !token) {
        setError("User ID or token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/${userId}/followList`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT in Authorization header
            },
          }
        );

        setFollowedUsers(response.data); // Assuming the response contains the list of followed users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedUsers();
  }, []); // Empty dependency array to run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2>Followed Yodelers</h2>
      <ul className="space-y-4 ">
        {followedUsers.map((user) => (
          <li
            key={user.id}
            className="bg-white flex items-center space-x-4 border rounded-lg p-4 shadow-md"
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.username}'s profile`}
                className="w-10 h-10 object-cover object-center"
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
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedUsersList;
