// FollowButton.jsx
import React from "react";
import axios from "axios";

const FollowButton = ({ authorId, currentUserId }) => {
  const followUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/${authorId}/follow`,
        {
          followerId: currentUserId,
        }
      );

      // Handle the response (optional)
      console.log("User followed successfully:", response.data);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <button
      onClick={followUser}
      className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
    >
      Follow
    </button>
  );
};

export default FollowButton;
