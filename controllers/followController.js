const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Follow a user
const followUser = async (req, res) => {
  const { userId } = req.params;
  const followerId = req.user.id;

  try {
    // Check if the user to follow exists
    const userToFollow = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a relationship in the following table
    await prisma.userFollowing.create({
      data: {
        followerId: followerId,
        followingId: parseInt(userId),
      },
    });

    res.status(200).json({ message: `User ${userId} followed.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to follow user." });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const followerId = req.user.id;

  try {
    // Check if the user to unfollow exists
    const userToUnfollow = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!userToUnfollow) {
      return res.status(404).json({ error: "User not found." });
    }

    // Remove the relationship in the following table
    await prisma.userFollowing.deleteMany({
      where: {
        followerId: followerId,
        followingId: parseInt(userId),
      },
    });

    res.status(200).json({ message: `User ${userId} unfollowed.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to unfollow user." });
  }
};

const getUserFollowing = async (req, res) => {
  const followerId = req.user.id; // Get the follower ID from the request (assuming user is authenticated)

  try {
    // Fetch the UserFollowing data for the specified follower
    const userFollowing = await prisma.userFollowing.findMany({
      where: {
        followerId: followerId, // Filter by the follower's ID
      },
      include: {
        following: {
          // Include the followed user's details
          select: {
            id: true,
            username: true, // Adjust this according to your User model
            // Add more fields as necessary
          },
        },
      },
    });

    // Map the results to return only the followed user data
    const followedUsers = userFollowing.map((follow) => follow.following);

    // Respond with the followed user data
    return res.status(200).json(followedUsers);
  } catch (error) {
    console.error("Error fetching user following:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { followUser, unfollowUser, getUserFollowing };
